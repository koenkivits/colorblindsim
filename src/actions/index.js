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

export const toggleFacingMode = state => {
  const newMode = state.webcam.facingMode === "user" ? "environment" : "user";
  let result = setFacingMode(state, newMode);
  return setCameraConstraints(result, {
    facingMode: {
      exact: newMode,
    },
  });
};

export const setCameraConstraints = ({ webcam, ...other }, constraints) => ({
  ...other,
  webcam: {
    ...webcam,
    constraints,
  },
});

export const receiveCameras = ({ cameras, ...other }, list) => ({
  ...other,
  cameras: {
    ...cameras,
    list,
  },
});

export const setFrontBackSupport = (
  { cameras, ...other },
  frontBackSupport,
) => ({
  ...other,
  cameras: {
    ...cameras,
    frontBackSupport,
  },
});
