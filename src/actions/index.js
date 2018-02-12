export const setDisabled = ({ daltonizer, ...other }, disabled) => ({
  ...other,
  daltonizer: {
    ...daltonizer,
    disabled,
  },
});

export const toggleDisabled = state =>
  setDisabled(state, !state.daltonizer.disabled);

export const setAnomaly = ({ daltonizer, ...other }, anomaly) => {
  return {
    ...other,
    daltonizer: {
      ...daltonizer,
      anomaly,
    },
  };
};

export const toggleFacingMode = ({ webcam, ...other }) => ({
  ...other,
  webcam: {
    ...webcam,
    facingMode: webcam.facingMode === "user" ? "environment" : "user",
  },
});
