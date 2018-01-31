import { h, Component } from "preact";

import Daltonize from "./containers/Daltonize";
import imageUrl from "../assets/img/colorblind.jpg";

const img = <img src={imageUrl} width="600" />;
const Application = () => (
  <div>
    <Daltonize>{img}</Daltonize>
  </div>
);

export default Application;
