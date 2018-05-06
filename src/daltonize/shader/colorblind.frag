precision mediump float;

// our texture
uniform sampler2D u_image;

uniform vec4 u_blinderLine;
uniform bool u_anomalize;
uniform bool u_achroma;
uniform bool u_enabled;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

vec3 convertRgbToXyz(vec3 o) {
  vec3 z = o;

  mat3 matrixRgbXyz = mat3(
    0.41242371206635076, 0.3575793401363035, 0.1804662232369621,
    0.21265606784927693, 0.715157818248362, 0.0721864539171564,
    0.019331987577444885, 0.11919267420354762, 0.9504491124870351
  );

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
  }

  return vec3(o.x / n, o.y / n, o.y);
}

vec3 anomalize(vec3 z, vec3 rgb) {
  float v = 1.75;
  float n = v + 1.0;
  return (v * z + rgb) / n;
}

vec3 applyGammaCorrection(vec3 rgb) {
  // apply gamma and clamp simulated color...
  float gammaCorrection = 2.2; // TODO make param
  return vec3(
    pow(rgb.r, 1.0 / gammaCorrection),
    pow(rgb.g, 1.0 / gammaCorrection),
    pow(rgb.b, 1.0 / gammaCorrection)
  );
}

vec3 applyAchroma(vec3 rgb) {
  float z = rgb.r * 0.212656 + rgb.g * 0.715158 + rgb.b * 0.072186;

  if (!u_anomalize) {
    // overexpose to simulate high light sensitivity to achromatopsia
    float exposure = 2.0; // make param?
    z *= exposure;
  }

  return vec3(z, z, z);
}

vec3 applyBlinder(vec3 rgb) {
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
    -0.969259258688888,  1.875996969313966, 0.041556132211625726,
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

  float adjust = max(_r, max(_g, _b));

  // shift proportionally...
  z = z + adjust * d;

  return applyGammaCorrection(z);
}

void main() {
  vec4 rgba = texture2D(u_image, v_texCoord).rgba;
  vec3 rgb = rgba.rgb;
  vec3 z = rgb;

  if (u_enabled) {
    if (u_achroma) {
      z = applyAchroma(rgb);
    } else {
      z = applyBlinder(rgb);
    }

    if (u_anomalize) {
      z = anomalize(z, rgb);
    }
  }

  gl_FragColor = vec4(z.r, z.g, z.b, rgba.a);
}
