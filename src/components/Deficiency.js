import { h } from "preact";

import colorVisionData from "../../lib/daltonize/anomalies";

const Deficiency = ({ deficiency, ...otherProps }) => (
  <div {...otherProps}>
    <small>{deficiency ? colorVisionData[deficiency].description : "\n"}</small>
    <div>{deficiency ? colorVisionData[deficiency].name : "Normal vision"}</div>
    <small>{deficiency && colorVisionData[deficiency].stats}</small>
  </div>
);

export default Deficiency;
