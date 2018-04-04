import { h } from "preact";

import "./MainMenu.scss";

const MainMenu = ({ children, ...otherProps }) => (
  <div class="main-menu hide-when-overlay">
    <div class="main-menu-items">{children}</div>
  </div>
);

export default MainMenu;
