export const toggleDisabled = ({ daltonizer, ...other }) => ({
  ...other,
  daltonizer: {
    ...daltonizer,
    disabled: !daltonizer.disabled,
  },
});

// TODO anomalies should not be part of actions
// (to guarantee purity and stuff)
const anomalies = [
  "protanomaly",
  "protanopia",
  "deuteranomaly",
  "deuteranopia",
  "tritanomaly",
  "tritanopia",
];

export const nextAnomaly = ({ daltonizer, ...other }) => {
  const currentIndex = anomalies.indexOf(daltonizer.anomaly);
  const nextAnomaly = anomalies[(currentIndex + 1) % anomalies.length];

  return {
    ...other,
    daltonizer: {
      ...daltonizer,
      anomaly: nextAnomaly,
    },
  };
};
