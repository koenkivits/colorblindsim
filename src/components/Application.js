import { h, Component } from "preact";

import { Router, Route } from "./Router";
import Introduction from "./Introduction";
import Simulator from "../containers/Simulator";

import "./Application.scss";

class Application extends Component {
  render() {
    return (
      <main>
        <Introduction id="splash" />
        <Router>
          <Route component={Simulator} id="app" field="deficiency" />
        </Router>
      </main>
    );
  }
}

export default Application;
