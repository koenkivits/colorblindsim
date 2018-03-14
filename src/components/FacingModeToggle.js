import { h, Component } from "preact";

import style from "./FacingModeToggle.css";
import RefreshCw from "preact-feather/dist/icons/refresh-cw";

export default class FacingModeToggle extends Component {
  render({ facingMode, toggleFacingMode }) {
    let classNames = "facing-mode-toggle facing-mode-toggle-" + facingMode;

    return (
      <button class={classNames} onClick={toggleFacingMode}>
        <RefreshCw stroke-width="1" size={48} />
      </button>
    );
  }
}
