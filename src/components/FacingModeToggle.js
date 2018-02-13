import { h, Component } from "preact";

import style from "./FacingModeToggle.css";
import { RefreshCw } from "preact-feather";

export default class FacingModeToggle extends Component {
  render({ facingMode, toggleFacingMode }) {
    let classNames = "facing-mode-toggle facing-mode-toggle-" + facingMode;

    return (
      <button class={classNames} onClick={toggleFacingMode}>
        <RefreshCw color="black" size={48} />
      </button>
    );
  }
}
