import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);

    this.streams = {};
  }

  componentDidMount() {
    this.initConstraints(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initConstraints(nextProps);
  }

  shouldComponentUpdate() {
    return false;
  }

  initConstraints(props) {
    const { constraints } = props;
    if (!constraints) {
      return;
    }

    if (constraints === this.props.constraints) {
      return;
    }

    this.props.onRequest();

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
      .catch(err => {
        switch (err.name) {
          case "ConstraintNotSatisfiedError":
          /* Chrome specific error, falls through */
          case "OverconstrainedError":
            if (this.props.onOverconstrained) {
              this.props.onOverconstrained(err);
            } else {
              this.handleError(err);
            }
            break;
          case "NotAllowedError":
            if (this.props.onNotAllowed) {
              this.props.onNotAllowed(err);
            } else {
              this.handleError(err);
            }
            break;
          default:
            this.handleError(err);
            break;
        }
      });
  }

  handleError(err) {
    if (this.props.onError) {
      this.props.onError(err);
    } else {
      console.error(err);
    }
  }

  initVideo(el) {
    if (el && this.video !== el) {
      this.video = el;
      this.initStream();
    }
  }

  initStream() {
    if (this.video && this.stream && this.video.srcObject !== this.stream) {
      this.video.srcObject = this.stream;
      this.video.addEventListener("loadedmetadata", e => {
        this.video.play();
        this.props.onInit();
      });
    }
  }

  render({ facingMode, ...otherProps }) {
    return <video {...otherProps} ref={el => this.initVideo(el)} />;
  }
}
