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
 * stats: percentages [male, female], mainly from https://en.wikipedia.org/wiki/Color_blindness
 */
const colorVisionData = {
  protanomaly: {
    name: "Protanomaly",
    blinder: blinder.protan,
    anomalize: true,
    stats: ["1", "0.01"],
  },
  protanopia: {
    name: "Protanopia",
    blinder: blinder.protan,
    stats: ["1", null],
  },
  deuteranomaly: {
    name: "Deuteranomaly",
    blinder: blinder.deutan,
    anomalize: true,
    stats: ["6", "0.4"],
  },
  deuteranopia: {
    name: "Deuteranopia",
    blinder: blinder.deutan,
    stats: ["1", null],
  },
  tritanomaly: {
    name: "Tritanomaly",
    blinder: blinder.tritan,
    anomalize: true,
    stats: ["0.01", true],
  },
  tritanopia: {
    name: "Tritanopia",
    blinder: blinder.tritan,
    stats: ["1", true],
  },
  achromatomaly: {
    name: "Achromatomaly",
    blinder: blinder.achroma,
    anomalize: true,
    achroma: true,
    stats: null, // could not find any
  },
  achromatopsia: {
    name: "Achromatopsia",
    blinder: blinder.achroma,
    achroma: true,
    stats: ["0.0033", true],
  },
};

export default colorVisionData;
