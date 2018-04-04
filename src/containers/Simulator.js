import { h } from "preact";
import { connect } from "unistore/preact";

import Application from "../components/Simulator";
import {
  receiveCameras,
  setFrontBackSupport,
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setCameraConstraints,
} from "../actions";

import { toggleOverlay } from "../actions/overlay";

const mapStateToProps = ({ daltonizer, cameras, webcam, overlay }) => ({
  daltonizer,
  cameras,
  webcam,
  overlay,
});
const actions = {
  receiveCameras,
  setFrontBackSupport,
  setDisabled,
  toggleDisabled,
  setAnomaly,
  toggleFacingMode,
  setCameraConstraints,
  toggleOverlay,
};

export default connect(mapStateToProps, actions)(Application);
