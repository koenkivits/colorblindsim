import { h } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";

const Anomaly = ({ anomaly, ...otherProps }) => (
  <div {...otherProps}>
    <small>{anomaly ? colorVisionData[anomaly].description : "\n"}</small>
    <div>{anomaly ? colorVisionData[anomaly].name : "Normal vision"}</div>
    <small>{anomaly && colorVisionData[anomaly].stats}</small>
  </div>
);

export default Anomaly;
