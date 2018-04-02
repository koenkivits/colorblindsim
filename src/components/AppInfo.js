import { h, Component } from "preact";
import ArrowDown from "preact-feather/dist/icons/arrow-down";
import Info from "preact-feather/dist/icons/info";

import "./AppInfo.scss";
import logoUrl from "../img/logo.svg";

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
          "app-info overlay overlay--right" + (active ? " overlay--open" : "")
        }
      >
        <button class="overlay__toggle" onClick={toggle}>
          <span class="overlay__toggle-icon overlay__toggle-icon--open">
            <Info size={32} />
          </span>
          <span class="overlay__toggle-icon overlay__toggle-icon--close">
            <ArrowDown size={32} />
          </span>
        </button>
        <div class="overlay__content">
          <p>
            <img src={logoUrl} alt="" width="100" height="100" />
          </p>
          <h2>ColorBlindSim</h2>
          <p>
            Made with care by{" "}
            <a href="https://koen.kivits.com" rel="noopener">
              Koen Kivits
            </a>. You can find me on{" "}
            <a href="https://twitter.com/koenkivits">Twitter</a> or{" "}
            <a href="https://github.com/koenkivits">Github</a>. Please don't
            hesitate to contact me if you find any issues.
          </p>
          <p>
            This application is open source. You can find the source on{" "}
            <a href="https://github.com/koenkivits/colorblindsim">Github</a>.
          </p>
        </div>
      </div>
    );
  }
}
