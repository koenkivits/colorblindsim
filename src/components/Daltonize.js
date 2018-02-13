import { h, Component } from "preact";

import Daltonizer from "../../lib/daltonize/Daltonizer";
import style from "./Daltonize.css";

export default class Daltonize extends Component {
  constructor(props) {
    super(props);

    this.daltonizer = new Daltonizer();
  }

  componentDidMount() {
    const render = () => {
      this.daltonizer.render(this.props.anomaly, !this.props.disabled);
      requestAnimationFrame(render);
    };

    render();
  }

  initOriginal(parentNode) {
    if (!parentNode) return;
    const original = parentNode.children[0];

    // TODO use addEventListener instead
    // TODO vary on input type
    original.onload = original.onloadedmetadata = () => {
      const style = window.getComputedStyle(original);
      canvas.style.objectFit = style.getPropertyValue("object-fit");

      this.daltonizer.bindSource(original);
    };

    const canvas = this.daltonizer.getCanvas();
    if (canvas.parentNode !== parentNode) {
      parentNode.appendChild(canvas);
    }
  }

  render({ anomaly, children, ...otherProps }) {
    return (
      <div {...otherProps}>
        <div class="daltonize-container" ref={div => this.initOriginal(div)}>
          {children}
        </div>
      </div>
    );
  }
}
