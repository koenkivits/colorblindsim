const img = document.querySelector("img");
img.onload = function() {
    render(img);
}

// x,y: coordinates, m: slope, yi: y-intercept
const blinder = {
    protan: {
        x: 0.7465,
        y: 0.2535,
        m: 1.273463,
        yi: -0.073894
    },
    deutan: {
        x: 1.4,
        y: -0.4,
        m: 0.968437,
        yi: 0.003331
    },
    tritan: {
        x: 0.1748,
        y: 0,
        m: 0.062921,
        yi: 0.292119
    },
};

const colorVisionData = {
	protanomaly: {
		blinder: blinder.protan,
		anomalize: true,
	},
	protanopia: {
		blinder: blinder.protan,
	},
	deuteranomaly: {
		blinder: blinder.deutan,
		anomalize: true
	},
	deuteranopia: {
		blinder: blinder.deutan,
	},
	tritanomaly: {
		blinder: blinder.tritan,
		anomalize: true
	},
	tritanopia: {
		blinder: blinder.tritan,
	},
	achromatomaly: {
		blinder: blinder.achroma,
		anomalize: true
	},
	achromatopsia: {
		blinder: blinder.achroma
	},
};

function render(image) {
    // Get A WebGL context
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
      var gl = canvas.getContext("webgl");
      if (!gl) {
        return;
    }

    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;

    // setup GLSL program
    const program = gl.createProgram();

    const fragmentShader = require('./shader/colorblind.frag').compile(gl);
    const vertexShader = require('./shader/rectangle.vert').compile(gl);

    gl.attachShader( program, vertexShader );
    gl.attachShader( program, fragmentShader );
    gl.linkProgram( program );

    // look up where the vertex data needs to go.
    const texcoordLocation = gl.getAttribLocation(program, "a_texCoord");

    // provide texture coordinates for the rectangle.
    const texcoordBuffer = gl.createBuffer();
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

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the texcord attribute
    gl.enableVertexAttribArray(texcoordLocation);

    // Bind the texcoord buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

    // Tell the texCoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
        texcoordLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );

    // set the resolution
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

	const data = colorVisionData.tritanopia;
	const lineLocation = gl.getUniformLocation(program, 'u_blinderLine');
	gl.uniform4fv(lineLocation, Object.values(data.blinder));

	const anomLocation = gl.getUniformLocation(program, 'u_anomalize');
	gl.uniform1i(anomLocation, data.anomalize || false);

    // Draw the rectangle.
    gl.drawArrays(
        gl.TRIANGLES,
        0,
        6 // 2 triangles, 3 vertices each
    );
}
