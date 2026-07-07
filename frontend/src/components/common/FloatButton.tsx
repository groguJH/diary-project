"use client";

import { FloatButton as AntdFloatButton } from "antd";
import type { FloatButtonProps as AntdFloatButtonProps } from "antd";
import styled from "styled-components";

export interface FloatButtonProps
  extends Omit<AntdFloatButtonProps, "aria-label" | "tooltip" | "type"> {
  label?: string;
  tooltip?: AntdFloatButtonProps["tooltip"];
  variant?: AntdFloatButtonProps["type"];
}

const StyledFloatButton = styled(AntdFloatButton)`
  @media (max-width: 640px) {
    inset-inline-end: 2rem;
    bottom: 9.6rem;
  }

  .ant-float-btn-body {
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
  }

  &.ant-float-btn-primary {
    .ant-float-btn-body {
      background: var(--color-primary);
      color: var(--color-text);
    }

    &:hover .ant-float-btn-body {
      background: var(--color-primary-hover);
      color: var(--color-text);
    }
  }

  .ant-float-btn-icon {
    color: inherit;
  }
`;

export function FloatButton({
  label = "일기 작성",
  tooltip,
  variant = "primary",
  shape = "circle",
  ...props
}: FloatButtonProps) {
  return (
    <StyledFloatButton
      {...props}
      aria-label={label}
      shape={shape}
      tooltip={tooltip ?? label}
      type={variant}
    />
  );
}

export default FloatButton;
