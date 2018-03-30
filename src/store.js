import createStore from "unistore";
import devtools from "unistore/devtools";

const initialState = {
  daltonizer: {
    anomaly: "deuteranopia",
    disabled: false,
  },
  webcam: {
    facingMode: "environment",
  },
  cameras: {
    frontBackSupport: false,
    list: [],
  },
};

let store = createStore(initialState);
if (module.hot) {
  store = devtools(store);
}

export default store;
