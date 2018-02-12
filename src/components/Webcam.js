import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.initConstraints(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initConstraints(nextProps);
  }

  initConstraints(props) {
    const { constraints } = props;
    if (!constraints) {
      return;
    }

    window.navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then(stream => {
        this.stream = stream;
        this.initStream();
      })
      .catch(e => {
        switch (e.name) {
          case "OverconstrainedError":
            this.onOverconstrained(e);
            break;
          case "NotAllowedError":
            this.onNotAllowed(e);
            break;
          default:
            this.onError(e);
            break;
        }
      });
  }

  initVideo(el) {
    this.video = el;
    this.initStream();
  }

  initStream() {
    if (this.video && this.stream) {
      this.video.srcObject = this.stream;
      this.video.addEventListener("loadedmetadata", e => {
        this.video.play();
      });
    }
  }

  render({ facingMode, ...otherProps }) {
    return <video {...otherProps} ref={el => this.initVideo(el)} />;
  }
}
