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

  shouldComponentUpdate(nextProps) {
    return nextProps.children[0] !== this.props.children[0];
  }

  initOriginal(parentNode) {
    if (!parentNode) return;
    const original = parentNode.children[0];

    // TODO use addEventListener instead
    // TODO vary on input type
    original.onload = original.onloadedmetadata = () => {
      this.bindOriginal(original);

      window.addEventListener("resize", () => {
        // TODO: debounce?
        // this is mainly aimed at mobile, to detect orientation changes. Chrome seems to
        // fire orientationchange events to early, before camera has been recalibrated or
        // something
        this.bindOriginal(original);
      });
    };

    const canvas = this.daltonizer.getCanvas();
    if (canvas.parentNode !== parentNode) {
      parentNode.appendChild(canvas);
    }
    canvas.className = original.className;
  }

  bindOriginal(original) {
    const style = window.getComputedStyle(original);
    //canvas.style.objectFit = style.getPropertyValue("object-fit");
    this.daltonizer.bindSource(original);
    this.props.onBind(original);
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
