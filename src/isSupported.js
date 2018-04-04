const isSupported = () =>
  window.navigator.mediaDevices &&
  window.navigator.mediaDevices.enumerateDevices;

export default isSupported;
