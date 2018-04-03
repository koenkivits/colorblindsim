import { h, Component } from "preact";

import Daltonize from "../containers/Daltonize";
import Anomaly from "./Anomaly";
import Webcam from "./Webcam";
import MainMenu from "./MainMenu";
import DisabledToggle from "./DisabledToggle";
import FacingModeToggle from "./FacingModeToggle";
import AnomalySelector from "./AnomalySelector";
import AppInfo from "./AppInfo";
import logoUrl from "../img/logo.svg";

import "./Simulator.scss";

class Simulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingCamera: false,
      hasPermission: false,
      error: null,
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

  onCameraError = err => {
    if (
      err.name === "ConstraintNotSatisfiedError" ||
      err.name === "OverconstrainedError"
    ) {
      setFrontBackSupport(false);
      setFacingMode("environment");
      setCameraConstraints(true);
    } else {
      this.setState({ error: err.name }); // TODO move to Redux?
    }
  };

  resetError = () => {
    this.setState({
      error: null,
    });
  };

  maybeRenderError() {
    const { error } = this.state;

    if (!error) {
      return null;
    }

    let title, message;
    switch (error) {
      case "NotAllowedError":
        title = "Camera access denied";
        message =
          "Please allow camera access for ColorBlindSim to function. In most browsers you can change site permissions by clicking on the padlock next to the URL. You don't have to worry about your privacy: ColorBlindSim does all processing on your device and does not send any of your material over the internet.";
        break;
      case "InternalError":
        title = "Internal error";
        message =
          "ColorBlindSim encountered an internal error. This may be caused by another browser tab already using your device's camera.";
        break;
      case "NotReadableError":
        title = "Hardware error";
        message =
          "ColorBlindSim encountered a hardware issue that prevented it from accessing your camera. You might need to restart your device";
        break;
      case "NotFoundError":
        title = "No camera found";
        message =
          "ColorBlindSim could not find a camera on your device. Please connect a webcam or use ColorBlindSim on a different device with a camera.";
        break;
      case "SecurityError":
        title = "Security error";
        message =
          "Your security settings prevent ColorBlindSim from accessing the camera.";
        break;
      default:
        title = "Unknown error";
        message =
          "An unknown error occurred. You might want to try to refresh the page or restart your browser or device if this error persists.";
        break;
    }

    return (
      <div class="message message--error">
        <h2 class="message__title">{title}</h2>
        <p class="message__description">{message}</p>
        <button class="message__retry" onClick={this.resetError}>
          Try again
        </button>
      </div>
    );
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
    { letterbox, fetchingCamera, error, hasPermission },
  ) {
    let daltonizerClass = "daltonize";
    if (webcam && webcam.facingMode === "user") {
      daltonizerClass += " daltonize--mirror";
    }
    if (letterbox) {
      daltonizerClass += " daltonize--letterbox";
    }
    if (fetchingCamera) {
      daltonizerClass += " daltonize--fetching";
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
          {!error && (
            <Daltonize class={daltonizerClass} onBind={onBind}>
              <Webcam
                class="daltonize__content"
                constraints={webcam.constraints}
                onRequest={() => {
                  this.setState({ fetchingCamera: true });
                }}
                onInit={() => {
                  this.setState({ fetchingCamera: false, hasPermission: true });
                }}
                onError={this.onCameraError}
              />
            </Daltonize>
          )}
          <Anomaly
            anomaly={daltonizer.disabled ? null : daltonizer.anomaly}
            className="current-anomaly hide-when-overlay"
            onClick={() => toggleOverlay("selector")}
          />{" "}
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
        {!hasPermission &&
          fetchingCamera && (
            <div class="message">
              <p>
                <img src={logoUrl} width="100" height="100" alt="" />
              </p>
              <p>Getting camera access...</p>
            </div>
          )}
        {this.maybeRenderError()}
      </div>
    );
  }
}

export default Simulator;
