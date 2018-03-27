import { h, Component } from "preact";

import { isSupported, BROWSER_UNSUPPORTED, NO_CAMERA } from "../support";
import logoUrl from "../img/logo.svg";
import "./Introduction.css";

class Introduction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSupport: false,
      noSupportReason: null,
      supportChecked: false,
    };
  }

  componentDidMount() {
    isSupported()
      .then(() => this.setState({ hasSupport: true, supportChecked: true }))
      .catch(reason =>
        this.setState({ noSupportReason: reason, supportChecked: true }),
      );
  }

  renderSupportMessage() {
    const { noSupportReason } = this.state;
    let message;

    switch (noSupportReason) {
      case BROWSER_UNSUPPORTED:
        message = "Unfortunately, your browser does not support this app.";
        break;
      case NO_CAMERA:
        message =
          "No cameras have been found for this device. Please connect a webcam or open this app on a device with cameras (like most smartphones)";
        break;
    }

    if (message) {
      return <p>{message}</p>;
    }

    return null;
  }

  render(props, { hasSupport, noSupportReason, supportChecked }) {
    return (
      <section {...props}>
        <h1>
          <span class="logo">
            <img src={logoUrl} alt="" />
          </span>
          <span>Color Blindness Simulator</span>
        </h1>
        <p>Experience color blindness right from your browser.</p>

        {this.renderSupportMessage()}
        {supportChecked &&
          hasSupport && (
            <div>
              <a href="#app">Get started</a>
            </div>
          )}
      </section>
    );
  }
}

export default Introduction;
