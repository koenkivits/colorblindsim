import { h, Component } from "preact";

import LameRouter from "./LameRouter";
import Simulator from "../containers/Simulator";

class Application extends Component {
  render() {
    return (
      <main>
        <LameRouter>
          <Simulator id="app" />
        </LameRouter>
      </main>
    );
  }
}

export default Application;
