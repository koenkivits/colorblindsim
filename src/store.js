import createStore from "unistore";
import devtools from "unistore/devtools";

const initialState = {
  daltonizer: {
    anomaly: "tritanopia",
    disabled: false,
  },
  webcam: {
    facingMode: "environment",
  },
};

let store = createStore(initialState);
if (module.hot) {
  store = devtools(store);
}

export default store;
