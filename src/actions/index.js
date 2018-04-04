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
  const constraints = state.webcam.constraints;
  let newConstraints;

  if (constraints.facingMode) {
    // newer browsers can toggle between facing modes
    const newMode =
      constraints.facingMode.exact === "user" ? "environment" : "user";
    newConstraints = {
      facingMode: {
        exact: newMode,
      },
    };
  } else {
    // older browsers cycle through device IDs
    // this has the downside that I can't set an initial facing mode -- it'll just be the first camera
    const currentId = constraints.deviceId.exact;
    const currentIndex = state.cameras.list
      .map(camera => camera.id)
      .indexOf(currentId);
    const nextIndex = (currentIndex + 1) % state.cameras.list.length;
    const nextId = state.cameras.list[nextIndex].id;
    newConstraints = {
      deviceId: {
        exact: nextId,
      },
    };
  }

  return setCameraConstraints(state, newConstraints);
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
