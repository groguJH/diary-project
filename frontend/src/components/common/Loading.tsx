import type { HTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingWrap = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: var(--color-text-soft);
`;

const Spinner = styled.span`
  width: 3.2rem;
  height: 3.2rem;
  border: 3px solid var(--color-primary-light);
  border-top-color: var(--color-primary-hover);
  border-radius: var(--radius-full);
  animation: ${spin} 800ms linear infinite;
`;

const Label = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

export function Loading({ label = "Loading...", ...props }: LoadingProps) {
  return (
    <LoadingWrap {...props} aria-busy="true" aria-live="polite" role="status">
      <Spinner aria-hidden="true" />
      {label ? <Label>{label}</Label> : null}
    </LoadingWrap>
  );
}

export default Loading;
