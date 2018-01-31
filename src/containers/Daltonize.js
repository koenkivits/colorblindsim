import { h } from "preact";
import { connect } from "unistore/preact";

import Daltonize from "../components/Daltonize";
import { nextAnomaly } from "../actions";

const mapStateToProps = ({ daltonizer }) => ({
  ...daltonizer,
});
const actions = { nextAnomaly };

export default connect(mapStateToProps, actions)(
  ({ anomaly, nextAnomaly, toggleDisabled, children, ...otherProps }) => (
    <Daltonize anomaly={anomaly} onClick={nextAnomaly} {...otherProps}>
      {children}
    </Daltonize>
  ),
);
