import { h, Component } from "preact";

import "./FacingModeToggle.css";
import RefreshCw from "preact-feather/dist/icons/refresh-cw";

export default class FacingModeToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reversed: false,
    };
  }

  onClick = () => {
    this.setState({
      reversed: !this.state.reversed,
    });
    this.props.toggleFacingMode();
  };

  render() {
    const { reversed } = this.state;
    const classNames =
      "facing-mode-toggle" + (reversed ? " facing-mode-toggle--reversed" : "");

    return (
      <button class={classNames} onClick={this.onClick}>
        <RefreshCw stroke-width="1" size={48} />
      </button>
    );
  }
}
