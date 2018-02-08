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

export const setFacingMode = ({ webcam, ...other }, facingMode) => ({
  ...other,
  webcam: {
    ...webcam,
    facingMode,
  },
});

export const toggleFacingMode = state =>
  setFacingMode(
    state,
    state.webcam.facingMode === "user" ? "environment" : "user",
  );

export const supportFacingMode = ({ webcam, ...other }, facingMode) => {
  const { supported, ...camOther } = webcam;
  return {
    ...other,
    webcam: {
      ...camOther,
      supported: {
        ...camOther,
        [facingMode]: true,
      },
    },
  };
};
