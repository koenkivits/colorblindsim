const { Asset } = require('parcel-bundler');
const path = require('path');

module.exports = class ShaderAsset extends Asset {
    get type() {
        return 'js';
    }
    set type(value) {}

    generate() {
        const ext = path.extname(this.name);
        let shaderType;
        switch (ext) {
            case '.vert':
                shaderType = 'VERTEX_SHADER';
                break;
            case '.frag':
                shaderType = 'FRAGMENT_SHADER';
                break;
            default:
                throw new Error(`Unknown shader extension: ${ext}`);
        }

        return {
            js: `exports.compile = function(gl) {
                const shader = gl.createShader(gl.${shaderType});
                gl.shaderSource(shader, ${ JSON.stringify(this.contents) });
                gl.compileShader(shader);

                if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
                    throw ("An error occurred compiling the shaders: " + gl.getShaderInfoLog( shader ));
                }

                return shader;
            }`,
        };
    }
};
