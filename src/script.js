import { h, render } from "preact";
import { Provider } from "unistore/preact";

import store from "./store";
import Application from "./index";

if (module.hot) {
  require("preact/debug");
}

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  output,
);
