import { h } from "preact";
import { Eye, EyeOff } from "preact-feather";

const DisabledToggle = ({ disabled, ...otherProps }) => {
  const Icon = disabled ? Eye : EyeOff;
  const label = disabled ? "Enable" : "Disable";
  const color = disabled ? "black" : "white";

  return (
    <button class={disabled ? "" : "disable"} title={label} {...otherProps}>
      <span class="visually-hidden">{label}</span>
      <span aria-hidden="true">
        <Icon color={color} size="48" />
      </span>
    </button>
  );
};

export default DisabledToggle;