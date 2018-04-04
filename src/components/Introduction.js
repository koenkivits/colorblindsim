import { h, Component } from "preact";
import VideoIcon from "preact-feather/dist/icons/video";

import isSupported from "../isSupported";
import logoUrl from "../img/logo.svg";

class Introduction extends Component {
  render(props, { hasSupport, noSupportReason, supportChecked }) {
    const shouldShowCompatibility = !window.inPrerender;

    const showError = shouldShowCompatibility && !isSupported();
    const showGetStarted = shouldShowCompatibility && isSupported();

    return (
      <section {...props}>
        <h1>
          <span class="logo">
            <img src={logoUrl} alt="" />
          </span>
          <span>ColorBlindSim</span>
        </h1>
        <p>
          Color blindness affects approximately 1 in 22 people of the world
          population. Experience the world as they do, right from your browser.
        </p>
        <noscript>
          <p>
            ColorBlindSim requires JavaScript to be enabled in order to work.
            Please enable JavaScript and refresh the page, or switch to a
            browser with JavaScript enabled.
          </p>
        </noscript>
        {showError && (
          <p>
            Unfortunately, your browser does not support this app. ColorBlindSim
            has been tested to work the most recent versions of Chrome, Firefox,
            Safari and Edge.
          </p>
        )}
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
