"use client";

import { Modal, type ModalProps } from "antd";
import styled from "styled-components";

export interface AppModalProps extends ModalProps {
  width?: ModalProps["width"];
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background:
      linear-gradient(180deg, rgba(255, 248, 217, 0.78), #ffffff 18rem),
      var(--color-surface);
    box-shadow: 0 2.4rem 5rem rgba(58, 51, 40, 0.16);
    padding: 0;
    overflow: hidden;
  }

  .ant-modal-header {
    margin: 0;
    padding: 3rem 4rem 1.2rem;
    text-align: center;
  }

  .ant-modal-title {
    color: var(--color-text);
    font-size: 2.6rem;
    font-weight: 900;
    line-height: 1.2;
  }

  .ant-modal-close {
    top: 2.4rem;
    inset-inline-end: 2.4rem;
    color: var(--color-text-soft);
    border-radius: var(--radius-full);

    &:hover {
      background: var(--color-surface-soft);
      color: var(--color-text);
    }
  }

  .ant-modal-body {
    padding: 4.4rem 4.8rem;
  }
`;

export function AppModal({ footer = null, width = "48rem", ...props }: AppModalProps) {
  return <StyledModal centered footer={footer} width={width} {...props} />;
}

export default AppModal;
