import { h, Component } from "preact";

import LameRouter from "./LameRouter";
import Introduction from "./Introduction";
import Simulator from "../containers/Simulator";

import "./Application.scss";

class Application extends Component {
  render() {
    return (
      <main>
        <Introduction id="splash" />
        <LameRouter>
          <Simulator id="app" />
        </LameRouter>
      </main>
    );
  }
}

export default Application;
