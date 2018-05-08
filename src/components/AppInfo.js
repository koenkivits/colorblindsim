import { h, Component } from "preact";
import ArrowDown from "preact-feather/dist/icons/arrow-down";
import Info from "preact-feather/dist/icons/info";

import "./AppInfo.scss";
import "../style/overlays.scss";
import logoUrl from "../img/logo.svg";

export default class AppInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render({ active, toggle }) {
    const toggleLabel = active ? "Close info" : "Open info";
    const twitterText = "@koenkivits ";
    const twitterIntent =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(twitterText);

    return (
      <div
        class={
          "app-info overlay overlay--right" + (active ? " overlay--open" : "")
        }
        title={toggleLabel}
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
            Made by{" "}
            <a href="https://koen.kivits.com" rel="noopener">
              Koen Kivits
            </a>. You can find me on{" "}
            <a href="https://twitter.com/koenkivits">Twitter</a> and{" "}
            <a href="https://github.com/koenkivits">Github</a>.{" "}
            <a href="mailto:koen@kivits.com" rel="noopener">
              Mail me
            </a>{" "}
            or{" "}
            <a href={twitterIntent} rel="noopener">
              tweet me
            </a>{" "}
            if you have any questions or issues.
          </p>
          <p>
            Special thanks to Roel Nieskens and Roel van Gils for helping me
            improve this app with their feedback and advice.
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
