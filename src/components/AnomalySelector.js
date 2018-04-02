import { h, Component } from "preact";
import Menu from "preact-feather/dist/icons/menu";
import ArrowDown from "preact-feather/dist/icons/arrow-down";

import colorVisionData from "../../lib/daltonize/anomalies";
import "./AnomalySelector.css";

const AnomalyOption = ({ value, anomaly, selected, onClick }) => (
  <label class={selected ? "anomaly-value--selected" : ""} onClick={onClick}>
    <input type="radio" name="anomaly" checked={selected} value={value} />
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

  render({ value, active, toggleOverlay, onChange }, { isOverlay, expanded }) {
    const anomalies = Object.keys(colorVisionData);
    //const toggle = () => this.setState({ expanded: !expanded });
    const toggle = () => toggleOverlay("selector");

    /* TODO a11y / semantics */
    return (
      <div
        class={
          "anomaly-selector overlay--left" +
          (isOverlay ? " overlay" : "") +
          (active ? " overlay--open" : "")
        }
        ref={this.initSelector}
      >
        <button onClick={toggle} class="overlay__toggle toggle-anomaly">
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
              onClick={e => {
                if (e.target !== e.currentTarget) return;
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
