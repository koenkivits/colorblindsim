import { h, Component } from "preact";
import { Eye, EyeOff } from "preact-feather";

import Daltonize from "../../containers/Daltonize";
import imageUrl from "../../../assets/img/colorblind.jpg";

import style from "./style.css";

const img = <img src={imageUrl} class="daltonize-content" width="600" />;
class Application extends Component {
  render({ daltonizer, toggleDisabled }) {
    const ToggleIcon = daltonizer.disabled ? Eye : EyeOff;

    return (
      <div>
        <Daltonize class="daltonize">{img}</Daltonize>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <ToggleIcon color="white" size={48} onClick={toggleDisabled} />
        </div>
      </div>
    );
  }
}

export default Application;
