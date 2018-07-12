import { h, Component } from "preact";

import Daltonizer from "../daltonize/Daltonizer";
import "./Daltonize.scss";

export default class Daltonize extends Component {
  componentDidMount() {
    const render = () => {
      this.renderFrame();
      requestAnimationFrame(render);
    };

    render();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children[0] !== this.props.children[0];
  }

  renderFrame() {
    this.daltonizer.render(this.props.deficiency, !this.props.disabled);
    this.renderBlur();
  }

  renderBlur() {
    const canvas = this.daltonizer.canvas;
    const context = canvas.getContext("webgl");
    const pixelCount = context.drawingBufferWidth * context.drawingBufferHeight;
    const pixels = new Uint8Array(pixelCount * 4);

    let blur = 0;

    if (context && !this.props.disabled) {
      context.readPixels(
        0,
        0,
        context.drawingBufferWidth,
        context.drawingBufferHeight,
        context.RGBA,
        context.UNSIGNED_BYTE,
        pixels,
      );
      const sampleCount = 100;

      let sum = 0;
      for (let i = sampleCount; i; i--) {
        sum += pixels[Math.floor(Math.random() * pixelCount) * 4];
      }

      const lightLevel = sum / sampleCount / 0xff;
      blur = 1 + lightLevel * 1.5;
    }

    canvas.style.filter = `blur(${blur}px)`;
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

  render({ deficiency, disabled, mirrored, children, ...otherProps }) {
    const original = children[0];

    let style = { transform: "" };
    let canvasStyle = {};
    if (deficiency === "achromatopsia" && !disabled) {
      // scale down canvas, then blur, then scale back up for (hopefully) better performance
      // (this is an experiment)
      const scaleFactor = 1;
      canvasStyle.transform = `scale(${scaleFactor})`;
      style.transform = `scale(${1 / scaleFactor})`;
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
