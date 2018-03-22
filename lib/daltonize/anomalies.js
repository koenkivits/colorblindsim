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
  deuteranomaly: {
    name: "Deuteranomaly",
    blinder: blinder.deutan,
    anomalize: true,
    stats: "6% of males, 0.4% of females",
    description: "green-weakness",
  },
  deuteranopia: {
    name: "Deuteranopia",
    blinder: blinder.deutan,
    stats: "1% of males",
    description: "green-blindness",
  },
  protanomaly: {
    name: "Protanomaly",
    blinder: blinder.protan,
    anomalize: true,
    stats: "1% of males, 0.01% of females",
    description: "red-weakness",
  },
  protanopia: {
    name: "Protanopia",
    blinder: blinder.protan,
    stats: "1% of males",
    description: "red-blindness",
  },
  tritanomaly: {
    name: "Tritanomaly",
    blinder: blinder.tritan,
    anomalize: true,
    stats: "0.01% of males and females",
    description: "blue-weakness",
  },
  tritanopia: {
    name: "Tritanopia",
    blinder: blinder.tritan,
    stats: "1% of males and females",
    description: "blue-blindness",
  },
  achromatomaly: {
    name: "Achromatomaly",
    blinder: blinder.achroma,
    anomalize: true,
    achroma: true,
    stats: "very rare", // could not find any states
    description: "blue cone monochromacy",
  },
  achromatopsia: {
    name: "Achromatopsia",
    blinder: blinder.achroma,
    achroma: true,
    stats: "0.0033% of males and females",
    description: "monochromacy",
  },
};

export default colorVisionData;
