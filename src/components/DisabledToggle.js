import { h } from "preact";
import { Eye, EyeOff } from "preact-feather";

const DisabledToggle = ({ disabled, ...otherProps }) => {
  const Icon = disabled ? Eye : EyeOff;

  return (
    <button {...otherProps}>
      <span class="visually-hidden">{disabled ? "Enable" : "Disable"}</span>
      <span aria-hidden="true">
        <Icon color="white" size="48" />
      </span>
    </button>
  );
};

export default DisabledToggle;
