import { h, Component } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";

export default class AnomalySelector extends Component {
  render({ value, onChange }) {
    const anomalies = Object.keys(colorVisionData);

    return (
      <select onChange={e => onChange(e.target.value)}>
        {anomalies.map(anomaly => (
          <option value={anomaly} selected={anomaly === value}>
            {anomaly}
          </option>
        ))}
      </select>
    );
  }
}
