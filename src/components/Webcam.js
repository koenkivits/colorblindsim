import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);

    this.streams = {};
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

    // Memoize streams to make sure Firefox for Android doesn't keep popping up the
    // permission dialog
    const encoded = JSON.stringify(constraints);
    if (this.streams[encoded]) {
      this.stream = this.streams[encoded];
      this.initStream();
      return;
    }

    window.navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then(stream => {
        this.streams[encoded] = stream;
        this.stream = stream;
        this.initStream();
      })
      .catch(e => {
        switch (e.name) {
          case "ConstraintNotSatisfiedError":
          /* Chrome specific error, falls through */
          case "OverconstrainedError":
            this.props.onOverconstrained && this.props.onOverconstrained(e);
            break;
          case "NotAllowedError":
            this.props.onNotAllowed && this.props.onNotAllowed(e);
            break;
          default:
            this.props.onError && this.props.onError(e);
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
