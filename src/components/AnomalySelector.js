import { h, Component } from "preact";

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
  <label class={selected ? "selected" : ""}>
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

  render({ value, onChange }, { expanded }) {
    const anomalies = Object.keys(colorVisionData);
    const toggle = () => this.setState({ expanded: !expanded });

    /* TODO a11y / semantics */
    return (
      <div class={"anomaly-selector" + (expanded ? " expanded" : "")}>
        <span class="current-anomaly" onClick={toggle}>
          {value}
        </span>
        <div class="anomaly-values">
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
