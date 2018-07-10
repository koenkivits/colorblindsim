import { h, Component } from "preact";

import isSupported from "../isSupported";
import Daltonize from "../containers/Daltonize";
import Deficiency from "./Deficiency";
import Webcam from "./Webcam";
import MainMenu from "./MainMenu";
import DisabledToggle from "./DisabledToggle";
import FacingModeToggle from "./FacingModeToggle";
import DeficiencySelector from "./DeficiencySelector";
import AppInfo from "./AppInfo";
import logoUrl from "../img/logo.svg";

import "./Simulator.scss";

class Simulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingCamera: false,
      hasPermission: false,
      facingMode: null,
      error: null,
    };
  }

  componentDidMount() {
    const { setDeficiency, deficiency } = this.props;

    if (deficiency) {
      setDeficiency(deficiency);
    }

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

    if (nextProps.deficiency !== this.props.deficiency) {
      this.props.setDeficiency(nextProps.deficiency);
      this.props.setDisabled(false);

      if (this.props.overlay === "selector") {
        this.props.toggleOverlay("selector");
      }
    }
  }

  initCameras(cameras) {
    if (!cameras.length) {
      // TODO what to do if current camera already set?
      return;
    }

    const hasOnlyOneCamera = cameras.length === 1;
    const hasOlderSpec = !("getSettings" in MediaStreamTrack.prototype);

    if (hasOnlyOneCamera || hasOlderSpec) {
      this.props.setCameraConstraints({
        deviceId: {
          exact: cameras[0].id,
        },
      });
    } else {
      this.props.setCameraConstraints({
        facingMode: {
          exact: "environment",
        },
      });
    }

    this.props.setFrontBackSupport(!hasOnlyOneCamera);
  }

  onCameraInit = stream => {
    let facingMode;

    const track = stream.getVideoTracks()[0];
    if (track.getSettings && track.getConstraints) {
      const settings = track.getSettings();
      const constraints = track.getConstraints();

      const constraintFacingMode =
        constraints && constraints.facingMode && constraints.facingMode.exact;

      // Detect facing mode in the following order:
      // - from video track settings (the proper way)
      // - if above unavailable (like in Firefox, it seems): from constraints (we always go
      //    for exact constraints, so this *should* always be the correct facing mode)
      // - assume 'user' if unknown (usually the case with regular webcams)
      facingMode = settings.facingMode || constraintFacingMode || "user";
    } else {
      // older browsers don't support fetching camera settings, fall back to basic label check
      if (track.label.toLowerCase().indexOf("front") > -1) {
        facingMode = "user";
      } else {
        facingMode = "environment";
      }
    }

    this.setState({
      fetchingCamera: false,
      hasPermission: true,
      facingMode,
    });
  };

  onCameraError = err => {
    if (
      err.name === "ConstraintNotSatisfiedError" ||
      err.name === "OverconstrainedError"
    ) {
      setFrontBackSupport(false);
      setCameraConstraints(true); // just accept any camera
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
      setDeficiency,
      toggleFacingMode,
      setFrontBackSupport,
      setCameraConstraints,
      ...otherProps
    },
    { letterbox, fetchingCamera, error, hasPermission, facingMode },
  ) {
    if (!isSupported()) {
      // don't render anything when someone with an unsupported browser follows a link to the
      // app
      return null;
    }

    let daltonizerClass = "daltonize";
    if (facingMode === "user") {
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
        <DeficiencySelector
          active={overlay === "selector"}
          value={daltonizer.deficiency}
          toggle={() => toggleOverlay("selector")}
        />
        <AppInfo
          active={overlay === "info"}
          toggle={() => toggleOverlay("info")}
        />
        <div class={wrapperClass}>
          {!error && (
            <Daltonize class={daltonizerClass} onBind={onBind}>
              <Webcam
                class="daltonize__content"
                constraints={webcam.constraints}
                onRequest={() => {
                  this.setState({ fetchingCamera: true });
                }}
                onInit={this.onCameraInit}
                onError={this.onCameraError}
              />
            </Daltonize>
          )}
          <Deficiency
            deficiency={daltonizer.disabled ? null : daltonizer.deficiency}
            className="current-deficiency hide-when-overlay"
            onClick={() => toggleOverlay("selector")}
          />{" "}
          <MainMenu>
            <DisabledToggle
              disabled={daltonizer.disabled}
              onClick={toggleDisabled}
            />
            {cameras.frontBackSupport && (
              <FacingModeToggle toggleFacingMode={toggleFacingMode} />
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
