import styled from "styled-components";

export const Page = styled.section`
  display: grid;
  gap: clamp(1.8rem, 3vw, 2.8rem);
  padding-bottom: 0;
`;

export const Hero = styled.section`
  display: grid;
  min-height: 14rem;
  align-items: center;
  padding: clamp(2.4rem, 4vw, 3.6rem);
  background:
    linear-gradient(
      135deg,
      rgba(255, 248, 217, 0.96),
      rgba(255, 255, 255, 0.95) 56%,
      rgba(229, 247, 255, 0.92)
    ),
    var(--color-surface);
`;

export const HeroContent = styled.div`
  display: grid;
  max-width: 70rem;
  gap: 0.8rem;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--color-text);
  font-size: 3.6rem;
  line-height: 1.12;

  @media (max-width: 720px) {
    font-size: 2.8rem;
  }
`;

export const Description = styled.p`
  max-width: 62rem;
  margin: 0;
  color: var(--color-text-soft);
  font-size: 1.45rem;
`;

export const RegisterCard = styled.section`
  padding: clamp(0.4rem, 1vw, 1rem) clamp(1.2rem, 3vw, 2.4rem);
`;

export const RegisterContent = styled.div`
  display: grid;
  width: min(100%, 52rem);
  margin: 0 auto;
  gap: 1.8rem;
`;

export const RegisterHeading = styled.h2`
  margin-bottom: 2rem;
  color: var(--color-text);
  font-size: 1.8rem;
  line-height: 1.35;
`;

export const Form = styled.form`
  display: grid;
  gap: 0.8rem;
`;

export const Field = styled.label`
  display: grid;
  grid-template-rows: auto 4.4rem 2.6rem;
  gap: 0.35rem;
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 900;
`;

export const Input = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 4.4rem;
  padding: 0 1.4rem;
  border: 1px solid
    ${({ $invalid }) => ($invalid ? "#ff8a8a" : "var(--color-border)")};
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  outline: 0;

  &:focus {
    border-color: ${({ $invalid }) =>
      $invalid ? "#ff8a8a" : "var(--color-secondary-hover)"};
    box-shadow: 0 0 0 0.3rem
      ${({ $invalid }) =>
        $invalid ? "rgba(255, 138, 138, 0.24)" : "rgba(120, 210, 255, 0.24)"};
  }
`;

export const ErrorText = styled.p`
  height: 2.6rem;
  margin: 0;
  color: #8f2d2d;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.35;
  overflow: hidden;
`;

export const SubmitButton = styled.button`
  min-height: 4.6rem;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 900;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover {
    background: var(--color-primary-hover);
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
  height: 2rem;
  margin: 0;
  color: ${({ $error }) => ($error ? "#8f2d2d" : "#2f7045")};
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1.5;
  overflow: hidden;
  text-align: center;
`;
