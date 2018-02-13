import { h, Component } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";
import style from "./AnomalySelector.css";

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
            <label class={anomaly === value ? "selected" : ""}>
              <input
                type="radio"
                name="anomaly"
                checked={anomaly === value}
                value={anomaly}
                onChange={() => {
                  onChange(anomaly);
                  toggle();
                }}
              />{" "}
              {anomaly}
            </label>
          ))}
        </div>
      </div>
    );
  }
}
