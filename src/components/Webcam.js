import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);

    this.streams = {};
  }

  componentDidMount() {
    this.initConstraints(this.props.constraints);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.constraints !== this.props.constraints) {
      this.initConstraints(nextProps.constraints);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  initConstraints(constraints) {
    if (!constraints) {
      return;
    }

    this.props.onRequest();

    // Memoize streams to make sure Firefox for Android doesn't keep popping up the
    // permission dialog
    // TODO: memoization is disabled for now. Firefox for Android is slightly less friendly
    // now, but Safari for iOS is not broken anymore. Ugh.
    const encoded = JSON.stringify(constraints);
    if (this.streams[encoded] && false) {
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
      this.video.addEventListener(
        "loadedmetadata",
        () => {
          this.video.play();
          this.props.onInit();
        },
        { once: true },
      );
    }
  }

  render({ facingMode, ...otherProps }) {
    return <video playsinline {...otherProps} ref={el => this.initVideo(el)} />;
  }
}
