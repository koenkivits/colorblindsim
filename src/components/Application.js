import { h, Component } from "preact";
import { Eye, EyeOff } from "preact-feather";

import Daltonize from "../containers/Daltonize";
import Webcam from "./Webcam";
import FacingModeToggle from "./FacingModeToggle";
import AnomalySelector from "./AnomalySelector";
import imageUrl from "../../assets/img/colorblind.jpg";

import style from "./Application.css";

class Application extends Component {
  render({
    daltonizer,
    webcam,
    toggleDisabled,
    setDisabled,
    setAnomaly,
    toggleFacingMode,
  }) {
    const ToggleIcon = daltonizer.disabled ? Eye : EyeOff;
    let daltonizerClass = "daltonize";
    if (webcam && webcam.facingMode === "user") {
      daltonizerClass += " flip-x";
    }

    return (
      <div>
        <Daltonize class={daltonizerClass}>
          {/*<img src={imageUrl} class="daltonize-content" width="600" />*/}
          <Webcam class="daltonize-content" facingMode={webcam.facingMode} />
        </Daltonize>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <ToggleIcon color="white" size={48} onClick={toggleDisabled} />
          <FacingModeToggle
            facingMode={webcam.facingMode}
            toggleFacingMode={toggleFacingMode}
          />
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
