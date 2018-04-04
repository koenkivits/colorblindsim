import { h, Component } from "preact";

export default class Webcam extends Component {
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

    if (this.stream) {
      [].forEach.call(this.stream.getVideoTracks(), track => track.stop());
    }

    window.navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then(stream => {
        this.stream = stream;
        this.initStream();
      })
      .catch(err => {
        return this.props.onError(err);
      });
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
          this.props.onInit(this.stream);
        },
        { once: true },
      );
    }
  }

  render({ facingMode, ...otherProps }) {
    return <video playsinline {...otherProps} ref={el => this.initVideo(el)} />;
  }
}
