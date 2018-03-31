import { h, Component } from "preact";

import Daltonize from "../containers/Daltonize";
import Anomaly from "./Anomaly";
import Webcam from "./Webcam";
import MainMenu from "./MainMenu";
import DisabledToggle from "./DisabledToggle";
import FacingModeToggle from "./FacingModeToggle";
import AnomalySelector from "./AnomalySelector";
import AppInfo from "./AppInfo";

import "./Simulator.scss";

class Simulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingCamera: false,
    };
  }

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

  render(
    {
      cameras,
      daltonizer,
      webcam,
      overlay,
      toggleDisabled,
      toggleOverlay,
      setDisabled,
      setAnomaly,
      toggleFacingMode,
      setFrontBackSupport,
      setCameraConstraints,
      setFacingMode,
      ...otherProps
    },
    { letterbox, fetchingCamera },
  ) {
    let daltonizerClass = "daltonize";
    if (webcam && webcam.facingMode === "user") {
      daltonizerClass += " flip-x";
    }
    if (letterbox) {
      daltonizerClass += " daltonize-letterbox";
    }

    let wrapperClass = "daltonize-wrapper";

    // TODO cleanup
    // cover the entire screen if we wouldn't lose too much content, letterbox otherwise
    const onBind = video => {
      const actualRatio = video.offsetWidth / video.offsetHeight;
      const videoRatio = video.videoWidth / video.videoHeight;

      this.setState({
        letterbox: videoRatio / actualRatio < 0.8,
      });
    };

    return (
      <div
        {...otherProps}
        class={`daltonize-ui ${overlay ? "has-overlay" : ""}`}
      >
        <AnomalySelector
          active={overlay === "selector"}
          value={daltonizer.anomaly}
          toggleOverlay={toggleOverlay}
          onChange={anomaly => {
            setDisabled(false);
            setAnomaly(anomaly);
          }}
        />
        <AppInfo active={overlay === "info"} toggleOverlay={toggleOverlay} />
        <div class={wrapperClass}>
          <Daltonize
            class={daltonizerClass}
            style={{ visibility: fetchingCamera ? "hidden" : "" }}
            onBind={onBind}
          >
            <Webcam
              class="daltonize-content"
              constraints={webcam.constraints}
              onRequest={() => {
                this.setState({ fetchingCamera: true });
              }}
              onInit={() => {
                this.setState({ fetchingCamera: false });
              }}
              onOverconstrained={e => {
                setFrontBackSupport(false);
                setFacingMode("environment");
                setCameraConstraints(true);
              }}
            />
          </Daltonize>
          <Anomaly
            anomaly={daltonizer.disabled ? null : daltonizer.anomaly}
            className="current-anomaly hide-when-overlay"
            onClick={() => toggleOverlay("selector")}
          />{" "}
          {/* TODO cursor and stuff */}
          <MainMenu>
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
          </MainMenu>
        </div>
        {fetchingCamera && (
          <div class="message">
            <h2>Getting camera access...</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Simulator;
