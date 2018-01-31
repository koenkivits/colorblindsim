precision mediump float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
    vec4 rgba = texture2D(u_image, v_texCoord).rgba;
	gl_FragColor = vec4(rgba.b, rgba.r, rgba.g, rgba[3]);
}
