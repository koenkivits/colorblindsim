import { h, Component } from "preact";

import Daltonize from "../../containers/Daltonize";
import imageUrl from "../../../assets/img/colorblind.jpg";

import style from "./style.css";

const img = <img src={imageUrl} class="daltonize-content" width="600" />;
const Application = () => (
  <div>
    <Daltonize class="daltonize">{img}</Daltonize>
  </div>
);

export default Application;
