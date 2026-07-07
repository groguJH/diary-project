import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps {
  $fullWidth?: boolean;
  $variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    background-color: var(--color-primary);
    color: var(--color-text);
    border-color: transparent;
  `,
  secondary: `
    background-color: var(--color-secondary-light);
    color: var(--color-text);
    border-color: var(--color-border-blue);
  `,
  ghost: `
    background-color: transparent;
    color: var(--color-text-soft);
    border-color: var(--color-border);
  `,
  danger: `
    background-color: var(--color-danger);
    color: #ffffff;
    border-color: transparent;
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-height: 4.4rem;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 1.6rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  color: var(--color-text);
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  ${({ $variant = "primary" }) => variantStyles[$variant]}

  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;
