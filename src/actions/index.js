const actions = store => ({
  setAnomaly: (state, anomaly) => ({
    anomaly,
    ...state,
  }),
});

export default actions;
