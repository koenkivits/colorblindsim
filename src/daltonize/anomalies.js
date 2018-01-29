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

export default colorVisionData;
