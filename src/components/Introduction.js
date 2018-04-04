import { h, Component } from "preact";
import VideoIcon from "preact-feather/dist/icons/video";

import isSupported from "../isSupported";
import logoUrl from "../img/logo.svg";

class Introduction extends Component {
  render(props, { hasSupport, noSupportReason, supportChecked }) {
    const shouldShowCompatibility = !window.inPrerender;

    const showError = shouldShowCompatibility && !isSupported();
    const showGetStarted = shouldShowCompatibility && isSupported();

    // iOS 11 supports getUserMedia, but not in webviews :/
    // https://stackoverflow.com/a/9039885
    const isIOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    let inIOSWebview = false;
    if (showError && isIOS) {
      const versionRe = /CPU .*? OS (\d+)/;
      const matches = versionRe.exec(navigator.userAgent);
      if (matches[1]) {
        inIOSWebview = Number(matches[1]) >= 11;
      }
    }

    return (
      <section {...props}>
        <h1>
          <span class="logo">
            <img src={logoUrl} alt="" />
          </span>
          <span>ColorBlindSim</span>
        </h1>
        <p>
          Color blindness affects approximately 1 in 22 people globally.
          Experience the world as they do, right from your browser.
        </p>
        <noscript>
          <p>
            ColorBlindSim requires JavaScript to be enabled in order to work.
            Please enable JavaScript and refresh the page, or switch to a
            browser with JavaScript enabled.
          </p>
        </noscript>
        {showError &&
          (inIOSWebview ? (
            <p>
              Unfortunately iOS currently does not support this app outside of
              Safari. This means ColorBlindSim will not work in in-app webpages,
              alternative browsers like Chrome, and pages that have been added
              to the homescreen. You can still open ColorBlindSim in Safari.
            </p>
          ) : (
            <p>
              Unfortunately, your browser does not support this app. You can
              still try another one though! ColorBlindSim has been tested to
              work the most recent versions of Chrome, Firefox, Safari and Edge.
            </p>
          ))}
        {showGetStarted && (
          <div>
            <a class="get-started" href="#app">
              Get started <VideoIcon class="get-started__icon" size={24} />
            </a>
            <p>
              <small>
                ColorBlindSim will ask for your permission to use your camera.
              </small>
            </p>
          </div>
        )}
        <p>
          <small>
            <a
              rel="noopener"
              href="https://github.com/koenkivits/colorblindsim"
            >
              code on Github
            </a>{" "}
            ©{" "}
            <a rel="noopener" href="https://koen.kivits.com">
              Koen Kivits
            </a>
          </small>
        </p>
      </section>
    );
  }
}

export default Introduction;
