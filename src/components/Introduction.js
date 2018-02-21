import { h } from "preact";
import logoUrl from "../img/logo.svg";

const Introduction = props => (
  <section {...props}>
    <h1>
      <span class="logo">
        <img src={logoUrl} alt="" />
      </span>
      <span>Color Blindness Simulator</span>
    </h1>
    <p>Experience color blindness right from your browser.</p>
    <div>
      <a href="#app">Get started</a>
    </div>
  </section>
);

export default Introduction;
