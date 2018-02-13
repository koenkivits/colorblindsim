import { h, Component } from "preact";

import Daltonize from "../containers/Daltonize";
import Webcam from "./Webcam";
import DisabledToggle from "./DisabledToggle";
import FacingModeToggle from "./FacingModeToggle";
import AnomalySelector from "./AnomalySelector";

import style from "./Application.css";

class Application extends Component {
  componentDidMount() {
    window.navigator.mediaDevices
      .enumerateDevices()
      .then(devices => devices.filter(device => device.kind === "videoinput"))
      .then(devices =>
        devices.map(device => ({
          id: device.deviceId,
          label: device.label,
        })),
      )
      .then(this.props.receiveCameras);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cameras.list !== this.props.cameras.list) {
      this.initCameras(nextProps.cameras.list);
    }
  }

  initCameras(cameras) {
    if (!cameras.length) {
      // TODO what to do if current camera already set?
      return;
    }

    if (cameras.length === 1) {
      this.props.setCameraConstraints({
        deviceId: {
          exact: cameras[0].id,
        },
      });
      this.props.setFacingMode("user"); // assume regular webcam
    } else {
      this.props.setCameraConstraints({
        facingMode: {
          exact: "environment",
        },
      });
      this.props.setFacingMode("environment"); // try environment cam first
      this.props.setFrontBackSupport(true);
    }
  }

  render({
    cameras,
    daltonizer,
    webcam,
    toggleDisabled,
    setDisabled,
    setAnomaly,
    toggleFacingMode,
    setFrontBackSupport,
    setCameraConstraints,
    setFacingMode,
  }) {
    let daltonizerClass = "daltonize";
    if (webcam && webcam.facingMode === "user") {
      daltonizerClass += " flip-x";
    }

    return (
      <div>
        <Daltonize class={daltonizerClass}>
          <Webcam
            class="daltonize-content"
            constraints={webcam.constraints}
            onOverconstrained={e => {
              setFrontBackSupport(false);
              setFacingMode("environment");
              setCameraConstraints(true);
            }}
          />
        </Daltonize>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <DisabledToggle
            disabled={daltonizer.disabled}
            onClick={toggleDisabled}
          />
          {cameras.frontBackSupport && (
            <FacingModeToggle
              facingMode={webcam.facingMode}
              toggleFacingMode={toggleFacingMode}
            />
          )}
          {/*TODO show mirror icon when front/back not supported?*/}
          <AnomalySelector
            value={daltonizer.anomaly}
            onChange={anomaly => {
              setDisabled(false);
              setAnomaly(anomaly);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Application;
