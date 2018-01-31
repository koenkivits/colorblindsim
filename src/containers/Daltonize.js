import { h } from "preact";
import { connect } from "unistore/preact";

import Daltonize from "../components/Daltonize";

const anomalies = [
  "protanomaly",
  "protanopia",
  "deuteranomaly",
  "deuteranopia",
  "tritanomaly",
  "tritanopia",
];

const mapStateToProps = ({ daltonizer }) => ({
  ...daltonizer,
});

const actions = {
  toggleDisabled: ({ daltonizer, ...other }) => ({
    ...other,
    daltonizer: {
      ...daltonizer,
      disabled: !daltonizer.disabled,
    },
  }),

  nextAnomaly: ({ daltonizer, ...other }) => {
    const currentIndex = anomalies.indexOf(daltonizer.anomaly);
    const nextAnomaly = anomalies[(currentIndex + 1) % anomalies.length];

    return {
      ...other,
      daltonizer: {
        ...daltonizer,
        anomaly: nextAnomaly,
      },
    };
  },
};

export default connect(mapStateToProps, actions)(
  ({ anomaly, nextAnomaly, toggleDisabled, children, ...otherProps }) => (
    <Daltonize
      anomaly={anomaly}
      onClick={nextAnomaly}
      onDblclick={toggleDisabled}
      {...otherProps}
    >
      {children}
    </Daltonize>
  ),
);
