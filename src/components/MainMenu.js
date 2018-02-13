import { h } from "preact";

import style from "./MainMenu.css";

const MainMenu = ({ children, ...otherProps }) => (
  <div class="main-menu">
    <div class="main-menu-items">{children}</div>
  </div>
);

export default MainMenu;
