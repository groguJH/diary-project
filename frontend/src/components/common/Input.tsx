import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styled from "styled-components";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
}

const Field = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const Label = styled.label`
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 700;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  min-height: 4.6rem;
  padding: 1rem 1.4rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? "var(--color-danger)" : "var(--color-border)"};
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  outline: 0;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-secondary-hover);
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.38);
  }
`;

const HelperText = styled.p<{ $hasError?: boolean }>`
  margin: 0;
  color: ${({ $hasError }) =>
    $hasError ? "#8f2d2d" : "var(--color-text-soft)"};
  font-size: 1.2rem;
`;

export function Input({
  id,
  label,
  helperText,
  errorMessage,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <Field>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}
      <StyledInput
        {...props}
        $hasError={Boolean(errorMessage)}
        aria-describedby={describedBy}
        aria-invalid={Boolean(errorMessage) || undefined}
        id={inputId}
      />
      {errorMessage ? (
        <HelperText $hasError id={errorId}>
          {errorMessage}
        </HelperText>
      ) : null}
      {helperText ? <HelperText id={helperId}>{helperText}</HelperText> : null}
    </Field>
  );
}

export default Input;
