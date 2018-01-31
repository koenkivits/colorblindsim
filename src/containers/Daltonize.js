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

const mapStateToProps = ({ anomaly }) => ({
  anomaly,
});

const actions = {
  nextAnomaly: state => {
    const currentIndex = anomalies.indexOf(state.anomaly);
    const nextAnomaly = anomalies[(currentIndex + 1) % anomalies.length];

    return {
      ...state,
      anomaly: nextAnomaly,
    };
  },
};

export default connect(mapStateToProps, actions)(
  ({ anomaly, nextAnomaly, children }) => (
    <Daltonize anomaly={anomaly} onClick={nextAnomaly}>
      {children}
    </Daltonize>
  ),
);
