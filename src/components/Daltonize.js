import { h, Component } from "preact";

import Daltonizer from "../../lib/daltonize/Daltonizer";
import style from "./Daltonize.css";

export default class Daltonize extends Component {
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

  initCanvas(canvas) {
    if (!canvas) {
      return;
    }

    if (!this.daltonizer || this.daltonizer.getCanvas() !== canvas) {
      this.daltonizer = new Daltonizer(canvas);
    }
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
  }

  bindOriginal(original) {
    this.daltonizer.bindSource(original);
    this.props.onBind(original);
  }

  render({ anomaly, children, ...otherProps }) {
    const original = children[0];

    return (
      <div {...otherProps}>
        <canvas
          {...original.attributes}
          ref={canvas => this.initCanvas(canvas)}
        />
        <div class="daltonize-container" ref={div => this.initOriginal(div)}>
          {children}
        </div>
      </div>
    );
  }
}
