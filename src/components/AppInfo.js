import { h, Component } from "preact";

import ArrowDown from "preact-feather/dist/icons/arrow-down";
import Info from "preact-feather/dist/icons/info";

export default class AppInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render({ active, toggleOverlay }) {
    const toggle = () => toggleOverlay("info");

    return (
      <div
        class={
          "app-info overlay-on-mobile overlay-on-mobile--right" +
          (active ? " overlay-on-mobile--open" : "")
        }
      >
        <div class="overlay-on-mobile__toggle">
          <button onClick={toggle}>
            <span class="overlay-on-mobile__toggle-icon overlay-on-mobile__toggle-icon--open">
              <Info size={32} />
            </span>
            <span class="overlay-on-mobile__toggle-icon overlay-on-mobile__toggle-icon--close">
              <ArrowDown size={32} />
            </span>
          </button>
        </div>
        <div class="overlay-on-mobile__content">
          <h2>Color Blindness Simulator</h2>
          <p>Some very relevant info about the app.</p>
        </div>
      </div>
    );
  }
}
