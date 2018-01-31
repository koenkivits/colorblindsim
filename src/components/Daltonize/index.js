import { h, Component } from "preact";

import Daltonizer from "../../../lib/daltonize/Daltonizer";
import style from "./style.css";

export default class Daltonize extends Component {
  constructor(props) {
    super(props);

    this.daltonizer = new Daltonizer();
  }

  componentDidMount() {
    const render = () => {
      this.daltonizer.render(this.props.anomaly);
      requestAnimationFrame(render);
    };
    render();
  }

  initOriginal(parentNode) {
    if (!parentNode) return;
    const original = parentNode.children[0];
    original.onload = () => {
      this.daltonizer.bindSource(original);
    };

    parentNode.appendChild(this.daltonizer.getCanvas());
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
