import { h, Component } from "preact";
import Menu from "preact-feather/dist/icons/menu";
import ArrowDown from "preact-feather/dist/icons/arrow-down";

import colorVisionData from "../../lib/daltonize/anomalies";
import "./AnomalySelector.scss";
import "../style/overlays.scss";

const AnomalyOption = ({ value, anomaly, selected, onChange }) => (
  <label class={selected ? "anomaly-value--selected" : ""}>
    <input
      type="radio"
      name="anomaly"
      checked={selected}
      value={value}
      onChange={onChange}
    />
    {anomaly.name}
    <small>{anomaly.description}</small>
  </label>
);

export default class AnomalySelector extends Component {
  selector = null;

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isOverlay: false,
    };
  }

  resizeListener = () => {
    this.setState({
      isOverlay: window.matchMedia("(max-width: 1200px)").matches,
    });
  };

  initSelector = selector => {
    if (!selector) {
      window.removeEventListener("resize", this.resizeListener);
    }

    if (!this.selector) {
      window.addEventListener("resize", this.resizeListener);
    }
    this.selector = selector;

    if (this.selector) {
      this.resizeListener();
    }
  };

  render({ value, active, toggle, onChange }, { isOverlay, expanded }) {
    const anomalies = Object.keys(colorVisionData);

    const toggleLabel = active ? "Close menu" : "Open menu";

    return (
      <div
        class={
          "anomaly-selector overlay--left" +
          (isOverlay ? " overlay" : "") +
          (active ? " overlay--open" : "")
        }
        ref={this.initSelector}
      >
        <button
          onClick={toggle}
          class="overlay__toggle toggle-anomaly"
          title={toggleLabel}
        >
          <span class="overlay__toggle-icon overlay__toggle-icon--open">
            <Menu size={32} />
          </span>
          <span class="overlay__toggle-icon overlay__toggle-icon--close">
            <ArrowDown size={32} />
          </span>
        </button>
        <div class="anomaly-values overlay__content">
          {anomalies.map(anomaly => (
            <AnomalyOption
              value={anomaly}
              anomaly={colorVisionData[anomaly]}
              selected={anomaly === value}
              onChange={e => {
                onChange(anomaly);
                toggle();
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
