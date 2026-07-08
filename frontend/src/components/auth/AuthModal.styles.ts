import styled from "styled-components";

export const AuthContent = styled.div`
  display: grid;
  gap: 2.4rem;
`;

export const SocialButtonGroup = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding-top: 0.4rem;
`;

export const SocialButton = styled.button`
  display: inline-flex;
  width: min(100%, 28rem);
  min-height: 4.8rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid var(--color-border-blue);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 900;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: var(--color-secondary-hover);
    background: var(--color-surface-blue);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.34);
  }

  svg {
    color: #4285f4;
    font-size: 1.8rem;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 1.6rem;
`;

export const Field = styled.label`
  display: block;
`;

export const FieldInput = styled.input`
  width: 100%;
  min-height: 5rem;
  padding: 0 1.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.86);
  color: var(--color-text);
  outline: 0;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-secondary-hover);
    background: var(--color-surface);
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.24);
  }
`;

export const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 0.2rem;
`;

export const SubmitButton = styled.button<{ $variant?: "secondary" }>`
  min-height: 4.4rem;
  padding: 0 1.4rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: ${({ $variant }) =>
    $variant === "secondary" ? "var(--color-surface)" : "var(--color-primary-light)"};
  color: var(--color-text);
  font-weight: 900;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: ${({ $variant }) =>
      $variant === "secondary" ? "var(--color-secondary-hover)" : "var(--color-primary-hover)"};
    background: ${({ $variant }) =>
      $variant === "secondary" ? "var(--color-surface-blue)" : "var(--color-primary)"};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.62;
  }
`;

export const Message = styled.p<{ $error?: boolean }>`
  min-height: 2rem;
  margin: 0;
  color: ${({ $error }) => ($error ? "#8f2d2d" : "#2f7045")};
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
`;

export const HelpText = styled.button`
  width: fit-content;
  justify-self: center;
  color: var(--color-text-soft);
  font-size: 1.3rem;
  font-weight: 800;

  &:hover {
    color: var(--color-text);
  }

  &:focus-visible {
    outline: 0;
    border-radius: var(--radius-xs);
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.34);
  }
`;

export const AccountBox = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background:
    linear-gradient(135deg, var(--color-surface-soft), var(--color-surface-blue)),
    var(--color-surface);
  text-align: center;
`;

export const AccountName = styled.strong`
  color: var(--color-text);
  font-size: 1.6rem;
`;

export const AccountEmail = styled.span`
  color: var(--color-text-soft);
  font-size: 1.3rem;
`;
