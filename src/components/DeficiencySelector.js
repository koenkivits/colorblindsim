import { h, Component } from "preact";
import Menu from "preact-feather/dist/icons/menu";
import ArrowDown from "preact-feather/dist/icons/arrow-down";

import colorVisionData from "../daltonize/deficiencies";
import "./DeficiencySelector.scss";
import "../style/overlays.scss";

const DeficiencyOption = ({ value, deficiency, selected, onChange }) => (
  <label class={selected ? "deficiency-value--selected" : ""}>
    <input
      type="radio"
      name="deficiency"
      checked={selected}
      value={value}
      onChange={onChange}
    />
    {deficiency.name}
    <small>{deficiency.description}</small>
  </label>
);

export default class DeficiencySelector extends Component {
  selector = null;

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isOverlay: false,
    };
  }

  resizeListener = () => {
    this.setState({
      isOverlay: window.matchMedia("(max-width: 1200px)").matches,
    });
  };

  initSelector = selector => {
    if (!selector) {
      window.removeEventListener("resize", this.resizeListener);
    }

    if (!this.selector) {
      window.addEventListener("resize", this.resizeListener);
    }
    this.selector = selector;

    if (this.selector) {
      this.resizeListener();
    }
  };

  render({ value, active, toggle, onChange }, { isOverlay, expanded }) {
    const deficiencies = Object.keys(colorVisionData);

    const toggleLabel = active ? "Close menu" : "Open menu";

    return (
      <div
        class={
          "deficiency-selector overlay--left" +
          (isOverlay ? " overlay" : "") +
          (active ? " overlay--open" : "")
        }
        ref={this.initSelector}
      >
        <button
          onClick={toggle}
          class="overlay__toggle toggle-deficiency"
          title={toggleLabel}
        >
          <span class="overlay__toggle-icon overlay__toggle-icon--open">
            <Menu size={32} />
          </span>
          <span class="overlay__toggle-icon overlay__toggle-icon--close">
            <ArrowDown size={32} />
          </span>
        </button>
        <div class="deficiency-values overlay__content">
          {deficiencies.map(deficiency => (
            <DeficiencyOption
              value={deficiency}
              deficiency={colorVisionData[deficiency]}
              selected={deficiency === value}
              onChange={e => {
                onChange(deficiency);
                toggle();
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
