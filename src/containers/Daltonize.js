import { h } from "preact";
import { connect } from "unistore/preact";

import Daltonize from "../components/Daltonize";
import { nextAnomaly, toggleDisabled } from "../actions";

const mapStateToProps = ({ daltonizer }) => ({
  ...daltonizer,
});
const actions = { nextAnomaly, toggleDisabled };

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
