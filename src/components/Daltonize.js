import { h, Component } from "preact";

import Daltonizer from "../daltonize/Daltonizer";
import "./Daltonize.scss";

export default class Daltonize extends Component {
  componentDidMount() {
    const render = () => {
      this.daltonizer.render(this.props.deficiency, !this.props.disabled);
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

  render({ deficiency, disabled, mirrored, children, store, ...otherProps }) {
    const original = children[0];

    let style = { transform: "" };
    let canvasStyle = {};
    if (deficiency === "achromatopsia" && !disabled) {
      // simulate blurry sight for achromatopsia
      style.filter = "blur(2px)";

      // scale down canvas, then blur, then scale back up for (hopefully) better performance
      // (this is an experiment)
      canvasStyle.transform = "scale(.7)";
      style.transform = "scale(1.43)";
    }

    if (mirrored) {
      style.transform += " scaleX(-1)";
    }

    return (
      <div style={style} {...otherProps}>
        <canvas
          {...original.attributes}
          style={canvasStyle}
          ref={canvas => this.initCanvas(canvas)}
        />
        <div class="daltonize-container" ref={div => this.initOriginal(div)}>
          {children}
        </div>
      </div>
    );
  }
}
