export const toggleDisabled = ({ daltonizer, ...other }) => ({
  ...other,
  daltonizer: {
    ...daltonizer,
    disabled: !daltonizer.disabled,
  },
});

export const setAnomaly = ({ daltonizer, ...other }, anomaly) => {
  return {
    ...other,
    daltonizer: {
      ...daltonizer,
      anomaly,
    },
  };
};

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

export const nextAnomaly = state => {
  const currentIndex = anomalies.indexOf(state.daltonizer.anomaly);
  const nextAnomaly = anomalies[(currentIndex + 1) % anomalies.length];

  return setAnomaly(state, nextAnomaly);
};
