import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Application";
import {
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setFacingMode,
  supportFacingMode,
} from "../actions";

const mapStateToProps = ({ daltonizer, webcam }) => ({
  daltonizer,
  webcam,
});
const actions = {
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setFacingMode,
  supportFacingMode,
};

export default connect(mapStateToProps, actions)(Application);
