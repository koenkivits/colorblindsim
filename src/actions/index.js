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
