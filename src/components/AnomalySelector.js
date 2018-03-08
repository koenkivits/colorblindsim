import { h, Component } from "preact";
import { Menu, ArrowLeft } from "preact-feather";

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
          "anomaly-selector overlay-on-mobile overlay-on-mobile--left" +
          (active ? " overlay-on-mobile--open" : "")
        }
      >
        <div class="overlay-on-mobile__toggle">
          <button class="toggle-anomaly" onClick={toggle}>
            <span class="overlay-on-mobile__toggle-icon overlay-on-mobile__toggle-icon--open">
              <Menu color="white" size={32} />
            </span>
            <span class="overlay-on-mobile__toggle-icon overlay-on-mobile__toggle-icon--close">
              <ArrowLeft color="white" size={32} />
            </span>
          </button>
        </div>
        <div class="anomaly-values overlay-on-mobile__content">
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
