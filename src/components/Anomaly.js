import { h } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";

const Anomaly = ({ anomaly, ...otherProps }) => (
  <div {...otherProps}>
    <small>{colorVisionData[anomaly].description}</small>
    <div>{colorVisionData[anomaly].name}</div>
    <small>{colorVisionData[anomaly].stats}</small>
  </div>
);

export default Anomaly;
