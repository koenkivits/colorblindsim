import { h, Component } from "preact";

import style from "./FacingModeToggle.css";
import { RefreshCw } from "preact-feather";

export default class FacingModeToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFrontAndBack: false,
    };
  }

  componentDidMount() {
    let hasEnvironment = false;
    let hasUser = false;
    window.navigator.mediaDevices.enumerateDevices().then(devices => {
      this.setState({
        hasFrontAndBack:
          devices.filter(device => device.kind === "videoinput").length === 2,
      });
    });
  }

  render({ facingMode, toggleFacingMode }) {
    if (!this.state.hasFrontAndBack) {
      return null;
    }

    let classNames = "facing-mode-toggle facing-mode-toggle-" + facingMode;

    return (
      <button class={classNames} onClick={toggleFacingMode}>
        <RefreshCw color="white" size={48} />
      </button>
    );
  }
}
