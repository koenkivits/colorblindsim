import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);

    this.stream = null;
    this.streams = {
      user: null,
      environment: null,
    };
  }

  componentWillMount() {
    this.initFacingMode(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initFacingMode(nextProps);
  }

  initFacingMode(props) {
    const { facingMode = "environment" } = props;
    const cachedStream = this.streams[facingMode];
    if (cachedStream) {
      return this.setStream(cachedStream);
    }

    const constraints = {
      video: {
        facingMode: {
          exact: facingMode,
        },
      },
    };

    window.navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        this.streams[facingMode] = stream;
        this.setStream(stream);
        this.props.onSuccess(facingMode);
      })
      .catch(e => {
        switch (e.name) {
          case "OverconstrainedError":
            // TODO: this appears to be different in Chrome
            // (ugh)
            this.props.onOverconstrained(facingMode);
            break;
          default:
            this.props.onError(e);
            break;
        }
      });
  }

  setStream(stream) {
    this.stream = stream;
    this.initStream();
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
