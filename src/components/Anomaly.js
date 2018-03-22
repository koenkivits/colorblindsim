import { h } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";

const Anomaly = ({ anomaly, ...otherProps }) => (
  <div {...otherProps}>
    <div>{colorVisionData[anomaly].name}</div>
    <small>{colorVisionData[anomaly].description}</small>
  </div>
);

export default Anomaly;
