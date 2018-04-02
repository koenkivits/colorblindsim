export const BROWSER_UNSUPPORTED = 0;
export const NO_CAMERA = 1;

export const isSupported = () =>
  new Promise((resolve, reject) => {
    if (
      !window.navigator.mediaDevices ||
      !window.navigator.mediaDevices.enumerateDevices
    ) {
      reject(BROWSER_UNSUPPORTED);
    }

    resolve(true);
    /*window.navigator.mediaDevices
      .enumerateDevices()
      .then(list => list.filter(device => device.kind === "videoinput"))
      .then(
        cameras => (cameras.length > 0 ? resolve(true) : reject(NO_CAMERA)),
      );*/
  });
