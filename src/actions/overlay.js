export const openOverlay = (state, value) => ({
  ...state,
  overlay: value,
});

export const closeOverlay = state => ({
  ...state,
  overlay: void 0,
});

export const toggleOverlay = (state, value) =>
  state.overlay === value ? closeOverlay(state) : openOverlay(state, value);
