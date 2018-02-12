import { h, Component } from "preact";
import { Eye, EyeOff } from "preact-feather";

import Daltonize from "../containers/Daltonize";
import Webcam from "./Webcam";
import FacingModeToggle from "./FacingModeToggle";
import AnomalySelector from "./AnomalySelector";
import imageUrl from "../../assets/img/colorblind.jpg";

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
      //this.props.setFrontBackSupport(true);
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
  }) {
    const ToggleIcon = daltonizer.disabled ? Eye : EyeOff;
    let daltonizerClass = "daltonize";
    if (webcam && webcam.facingMode === "user") {
      daltonizerClass += " flip-x";
    }

    return (
      <div>
        <Daltonize class={daltonizerClass}>
          {/*<img src={imageUrl} class="daltonize-content" width="600" />*/}
          <Webcam class="daltonize-content" constraints={webcam.constraints} />
        </Daltonize>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <ToggleIcon color="white" size={48} onClick={toggleDisabled} />
          {cameras.frontBackSupport && (
            <FacingModeToggle
              facingMode={webcam.facingMode}
              toggleFacingMode={toggleFacingMode}
            />
          )}
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
