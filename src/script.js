import { h, render } from "preact";
import { Provider } from "unistore/preact";

import store from "./store";
import Application from "./components/Application";

const node = render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.body,
  document.querySelector("main"),
);

if (module.hot) {
  require("preact/debug");
}
