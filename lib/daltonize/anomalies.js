// x,y: coordinates, m: slope, yi: y-intercept
const blinder = {
  protan: {
    x: 0.7465,
    y: 0.2535,
    m: 1.273463,
    yi: -0.073894,
  },
  deutan: {
    x: 1.4,
    y: -0.4,
    m: 0.968437,
    yi: 0.003331,
  },
  tritan: {
    x: 0.1748,
    y: 0,
    m: 0.062921,
    yi: 0.292119,
  },
};

/**
 * TODO: drop name property, just capitalize keys
 * stats: percentages [male, female], mainly from https://en.wikipedia.org/wiki/Color_blindness
 */
const colorVisionData = {
  protanomaly: {
    name: "Protanomaly",
    blinder: blinder.protan,
    anomalize: true,
    stats: ["1", "0.01"],
    description: "red-weakness",
  },
  protanopia: {
    name: "Protanopia",
    blinder: blinder.protan,
    stats: ["1", null],
    description: "red-blindness",
  },
  deuteranomaly: {
    name: "Deuteranomaly",
    blinder: blinder.deutan,
    anomalize: true,
    stats: ["6", "0.4"],
    description: "green-weakness",
  },
  deuteranopia: {
    name: "Deuteranopia",
    blinder: blinder.deutan,
    stats: ["1", null],
    description: "green-blindness",
  },
  tritanomaly: {
    name: "Tritanomaly",
    blinder: blinder.tritan,
    anomalize: true,
    stats: ["0.01", true],
    description: "blue-weakness",
  },
  tritanopia: {
    name: "Tritanopia",
    blinder: blinder.tritan,
    stats: ["1", true],
    description: "blue-blindness",
  },
  achromatomaly: {
    name: "Achromatomaly",
    blinder: blinder.achroma,
    anomalize: true,
    achroma: true,
    stats: null, // could not find any
    description: "blue cone monochromacy",
  },
  achromatopsia: {
    name: "Achromatopsia",
    blinder: blinder.achroma,
    achroma: true,
    stats: ["0.0033", true],
    description: "monochromacy",
  },
};

export default colorVisionData;
