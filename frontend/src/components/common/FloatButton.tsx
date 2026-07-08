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
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  &:hover .ant-float-btn-body {
    border-color: #ded8ce;
    background: #f6f6f6;
    color: var(--color-text);
  }

  &.ant-float-btn-primary {
    .ant-float-btn-body {
      background: var(--color-surface);
      color: var(--color-text);
    }

    &:hover .ant-float-btn-body {
      background: #f6f6f6;
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
  variant = "default",
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
