precision mediump float;

// our texture
uniform sampler2D u_image;

uniform vec4 u_blinderLine;
uniform bool u_anomalize;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

// xy: coordinates, m: slope, yi: y-intercept
/*var blinder = {
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
    custom: {
        x: 0.735,
        y: 0.265,
        m: -1.059259,
        yi: 1.026914
    }
};*/

vec3 convertRgbToXyz(vec3 o) {
	vec3 z = o; // / 255.0;
    
	mat3 matrixRgbXyz = mat3(
	    0.41242371206635076, 0.3575793401363035, 0.1804662232369621,
		0.21265606784927693, 0.715157818248362, 0.0721864539171564,
		0.019331987577444885, 0.11919267420354762, 0.9504491124870351
	);
	
	// TODO check color profile === 'sRGB'
	z.r = z.r > 0.04045 ? pow(((z.r + 0.055) / 1.055), 2.4) : z.r / 12.92;
	z.g = z.g > 0.04045 ? pow(((z.g + 0.055) / 1.055), 2.4) : z.g / 12.92;
	z.b = z.b > 0.04045 ? pow(((z.b + 0.055) / 1.055), 2.4) : z.b / 12.92;
		
	return z * matrixRgbXyz;
}

vec3 convertXyzToXyY(vec3 o) {
    float n = o.x + o.y + o.z;
    if (n == 0.0) {
		// prevent division by zero
		return vec3(0, 0, o.y);
        //return {x: 0, y: 0, Y: o.Y};
    }

	return vec3(o.x / n, o.y / n, o.y);
}

vec3 anomalize(vec3 z, vec3 rgb) {
	float v = 1.75;
	float n = v + 1.0;
	return (v * z + rgb) / n;
}

void main() {
	vec4 rgba = texture2D(u_image, v_texCoord).rgba;
	vec3 rgb = rgba.rgb;

	// TODO switching type
	// TODO achroma

    /*vec4 line = vec4(
		// protan:
		0.7465,
		0.2535,
		1.273462,
		-0.073894

		// deutan:
		1.4,
		-0.4,
		0.968437,
		0.003331
		
		// tritan:
        0.1748, // x
        0.0, // y
        0.062921, // m
        0.292119 // yi
    );*/
    vec3 c = convertXyzToXyY(convertRgbToXyz(rgb)); // (x, y, Y)
    
	// The confusion line is between the source color and the confusion point
    float slope = (c.y - u_blinderLine.y) / (c.x - u_blinderLine.x);
    float yi = c.y - c.x * slope; // slope, and y-intercept (at x=0)

    // Find the change in the x and y dimensions (no Y change)
    float dx = (u_blinderLine.w - yi) / (slope - u_blinderLine.z);
    float dy = (slope * dx) + yi;

    // Find the simulated color's XYZ coords
	vec3 z = vec3(
		dx * c.z / dy,
		c.z,
		(1.0 - (dx + dy)) * c.z / dy
	);
    
	// Calculate difference between sim color and neutral color
    float ngx = 0.312713 * c.z / 0.329016; // find neutral grey using D65 white-point
    float ngz = 0.358271 * c.z / 0.329016;
	vec3 d = vec3(
    	ngx - z.x,
    	0.0,
	    ngz - z.z
	);

    // find out how much to shift sim color toward neutral to fit in RGB space
	mat3 matrixXyzRgb = mat3(
		3.240712470389558, -1.5372626602963142, -0.49857440415943116,
		-0.969259258688888,	1.875996969313966, 0.041556132211625726,
		0.05563600315398933, -0.2039948802843549, 1.0570636917433989
	);

	d = d * matrixXyzRgb;
	z = z * matrixXyzRgb;

	float _r = ((z.r < 0.0 ? 0.0 : 1.0) - z.r) / d.r;
    float _g = ((z.g < 0.0 ? 0.0 : 1.0) - z.g) / d.g;
    float _b = ((z.b < 0.0 ? 0.0 : 1.0) - z.b) / d.b;
    _r = (_r > 1.0 || _r < 0.0) ? 0.0 : _r;
    _g = (_g > 1.0 || _g < 0.0) ? 0.0 : _g;
    _b = (_b > 1.0 || _b < 0.0) ? 0.0 : _b;

	// TODO rewrite to max?
    float adjust = _r > _g ? _r : _g;
    if (_b > adjust) {
        adjust = _b;
    }

    // shift proportionally...
	z = z + adjust * d;

	// apply gamma and clamp simulated color...
	float gammaCorrection = 2.2; // TODO make param
    z.r = /*255.0 */ (z.r <= 0.0 ? 0.0 : z.r >= 1.0 ? 1.0 : pow(z.r, 1.0 / gammaCorrection));
    z.g = /*255.0 */ (z.g <= 0.0 ? 0.0 : z.g >= 1.0 ? 1.0 : pow(z.g, 1.0 / gammaCorrection));
    z.b = /*255.0 */ (z.b <= 0.0 ? 0.0 : z.b >= 1.0 ? 1.0 : pow(z.b, 1.0 / gammaCorrection));

    if (u_anomalize) {
		z = anomalize(z, rgb);
    }

	gl_FragColor = vec4(z.r, z.g, z.b, rgba.a);
	//gl_FragColor = vec4(rgb.r, rgb.g, rgb.b, rgba.a);
}
