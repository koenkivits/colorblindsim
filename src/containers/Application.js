import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Application";
import {
  receiveCameras,
  setFrontBackSupport,
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setFacingMode,
  setCameraConstraints,
} from "../actions";

const mapStateToProps = ({ daltonizer, cameras, webcam }) => ({
  daltonizer,
  cameras,
  webcam,
});
const actions = {
  receiveCameras,
  setFrontBackSupport,
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setFacingMode,
  setCameraConstraints,
};

export default connect(mapStateToProps, actions)(Application);
