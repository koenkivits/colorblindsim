import { h, Component } from "preact";
import Menu from "preact-feather/dist/icons/menu";
import ArrowDown from "preact-feather/dist/icons/arrow-down";

import colorVisionData from "../../lib/daltonize/anomalies";
import style from "./AnomalySelector.css";

const formatStats = stats => {
  if (!stats) {
    return "very rare";
  }

  let result = `${stats[0]}% of males`;
  if (!stats[1]) {
    return result;
  } else if (stats[1] === true) {
    return `${result} and females`;
  } else {
    return `${result}, ${stats[1]}% of females`;
  }
};

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
    <small>{formatStats(anomaly.stats)}</small>
  </label>
);

export default class AnomalySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render({ value, active, toggleOverlay, onChange }, { expanded }) {
    const anomalies = Object.keys(colorVisionData);
    //const toggle = () => this.setState({ expanded: !expanded });
    const toggle = () => toggleOverlay("selector");

    /* TODO a11y / semantics */
    return (
      <div
        class={
          "anomaly-selector overlay overlay--left" +
          (active ? " overlay--open" : "")
        }
      >
        <div class="overlay__toggle">
          <button class="toggle-anomaly" onClick={toggle}>
            <span class="overlay__toggle-icon overlay__toggle-icon--open">
              <Menu size={32} />
            </span>
            <span class="overlay__toggle-icon overlay__toggle-icon--close">
              <ArrowDown size={32} />
            </span>
          </button>
        </div>
        <div class="anomaly-values overlay__content">
          {anomalies.map(anomaly => (
            <AnomalyOption
              value={anomaly}
              anomaly={colorVisionData[anomaly]}
              selected={anomaly === value}
              onChange={() => {
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
