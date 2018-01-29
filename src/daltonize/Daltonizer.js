import anomalies from './anomalies';

export default class Daltonizer {
    constructor() {
        this.initCanvas();
    }

    getCanvas() {
        return this.canvas;
    }

    initCanvas() {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");

        if (!gl) {
            throw new Error("Could not initialize WebGL context!");
        }

        // setup GLSL program
        const program = gl.createProgram();

        const fragmentShader = require('./shader/colorblind.frag').compile(gl);
        const vertexShader = require('./shader/rectangle.vert').compile(gl);

        gl.attachShader( program, vertexShader );
        gl.attachShader( program, fragmentShader );
        gl.linkProgram( program ); 

        // store attribute locations
        this.texcoordLocation = gl.getAttribLocation(program, "a_texCoord");
        this.resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        this.lineLocation = gl.getUniformLocation(program, 'u_blinderLine');
        this.anomLocation = gl.getUniformLocation(program, 'u_anomalize');

        this.canvas = canvas;
        this.gl = gl;
        this.program = program;
    }

    bindSource(image) {
        const canvas = this.canvas;
        const gl = this.gl;

        canvas.width = image.offsetWidth; // TODO
        canvas.height = image.offsetHeight; // TODO
        
        // provide texture coordinates for the rectangle.
        const texcoordBuffer = this.texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0,
        ]), gl.STATIC_DRAW);

        // Create a texture.
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    render() {
        const canvas = this.canvas;
        const gl = this.gl;
        const program = this.program;


        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the texcord attribute
        gl.enableVertexAttribArray(this.texcoordLocation);

        // Bind the texcoord buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);

        // Tell the texCoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        gl.vertexAttribPointer(
            this.texcoordLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        // set the resolution
        gl.uniform2f(this.resolutionLocation, gl.canvas.width, gl.canvas.height);

        const data = anomalies.tritanopia;
        const lineLocation = gl.getUniformLocation(program, 'u_blinderLine');
        gl.uniform4fv(this.lineLocation, Object.values(data.blinder));

        const anomLocation = gl.getUniformLocation(program, 'u_anomalize');
        gl.uniform1i(this.anomLocation, data.anomalize || false);

        // Draw the rectangle.
        gl.drawArrays(
            gl.TRIANGLES,
            0,
            6 // 2 triangles, 3 vertices each
        );    
    }
}
