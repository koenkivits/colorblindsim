import { h, Component } from "preact";
import { Eye, EyeOff } from "preact-feather";

import Daltonize from "../containers/Daltonize";
import Webcam from "./Webcam";
import AnomalySelector from "./AnomalySelector";
import imageUrl from "../../assets/img/colorblind.jpg";

import style from "./Application.css";

class Application extends Component {
  render({ daltonizer, toggleDisabled, setDisabled, setAnomaly }) {
    const ToggleIcon = daltonizer.disabled ? Eye : EyeOff;

    return (
      <div>
        <Daltonize class="daltonize">
          {/*<img src={imageUrl} class="daltonize-content" width="600" />*/}
          <Webcam class="daltonize-content" />
        </Daltonize>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <ToggleIcon color="white" size={48} onClick={toggleDisabled} />
          <AnomalySelector
            value={daltonizer.anomaly}
            onChange={anomaly => {
              setDisabled(false);
              setAnomaly(anomaly);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Application;
