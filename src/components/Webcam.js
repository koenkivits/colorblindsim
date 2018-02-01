import { h, Component } from "preact";

export default class Webcam extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { facingMode = "environment" } = this.props;
    const constraints = {
      video: {
        facingMode,
      },
    };

    console.log(constraints);
    window.navigator.mediaDevices.getUserMedia(constraints).then(() => {
      console.log("YOLO");
      this.stream = stream;
      this.initStream();
    });
  }

  initVideo(el) {
    this.video = el;
    this.initStream();
  }

  initStream() {
    if (this.video && this.stream) {
      this.video.srcObject = this.stream;
      this.video.onloadedmetadata = e => {
        this.video.play();
      };
    }
  }

  render() {
    return <video ref={el => this.initVideo(el)} />;
  }
}
