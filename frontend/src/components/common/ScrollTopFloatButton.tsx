"use client";

import { FaArrowUp } from "react-icons/fa";
import FloatButton, { type FloatButtonProps } from "./FloatButton";

interface ScrollTopFloatButtonProps
  extends Omit<FloatButtonProps, "icon" | "label" | "onClick" | "tooltip"> {
  label?: string;
  tooltip?: FloatButtonProps["tooltip"];
}

export function ScrollTopFloatButton({
  label = "맨 위로 이동",
  tooltip = "맨 위로 이동",
  ...props
}: ScrollTopFloatButtonProps) {
  const handleClick = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <FloatButton
      {...props}
      icon={<FaArrowUp />}
      label={label}
      onClick={handleClick}
      tooltip={tooltip}
    />
  );
}

export default ScrollTopFloatButton;
