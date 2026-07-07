import { motion } from "framer-motion";
import styled from "styled-components";
import Card from "@/src/components/common/Card";

export const Page = styled.section`
  display: grid;
  gap: clamp(3.6rem, 6vw, 5.6rem);
  padding-bottom: 2rem;
`;

export const Hero = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  min-height: 28rem;
  align-items: center;
  padding: clamp(3.2rem, 6vw, 6.4rem);

  background:
    linear-gradient(
      135deg,
      rgba(255, 248, 217, 0.96),
      rgba(255, 255, 255, 0.95) 56%,
      rgba(229, 247, 255, 0.92)
    ),
    var(--color-surface);

  @media (max-width: 720px) {
    min-height: 24rem;
    padding: 3.2rem 2.2rem;
  }
`;

export const HeroContent = styled.div`
  display: grid;
  max-width: 70rem;
  gap: 1.4rem;
`;

export const Eyebrow = styled.p`
  width: fit-content;
  margin: 0;
  padding: 0.4rem 1rem;
  border: 1px solid var(--color-border-blue);
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text-soft);
  font-size: 1.3rem;
  font-weight: 900;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--color-text);
  font-size: 4.8rem;
  line-height: 1.12;

  @media (max-width: 720px) {
    font-size: 3.2rem;
  }
`;

export const Description = styled(motion.p)`
  max-width: 64rem;
  margin-top: 2rem;
  color: var(--color-text-soft);
  font-size: 1.7rem;
  line-height: 1.75;

  @media (max-width: 720px) {
    font-size: 1.5rem;
  }
`;

export const WritingSection = styled.section`
  width: 100%;
`;

export const WritingCard = styled(Card)`
  gap: clamp(2rem, 3vw, 2.8rem);
  padding: clamp(2.4rem, 4vw, 4rem);
  border-radius: var(--radius-lg);

  @media (max-width: 720px) {
    padding: 2rem;
  }
`;

export const WritingContent = styled.div`
  display: grid;
  width: min(100%, 86rem);
  margin: 0 auto;
  gap: clamp(2rem, 3vw, 2.8rem);
  padding: clamp(0.4rem, 1.5vw, 1.2rem) clamp(0rem, 2vw, 1.6rem);
`;

export const WritingHeading = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
  line-height: 1.35;
`;

export const PromptMemo = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 4.4rem;
  gap: 1.2rem;
  align-items: center;
  padding: 1.6rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const PromptBody = styled.div`
  display: grid;
  gap: 0.4rem;
  min-width: 0;
`;

export const PromptLabel = styled.span`
  color: var(--color-text-soft);
  font-size: 1.2rem;
  font-weight: 900;
`;

export const PromptText = styled.p`
  margin: 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1.6;
`;

export const PromptRefreshButton = styled.button`
  display: inline-grid;
  width: 4.4rem;
  height: 4.4rem;
  place-items: center;
  border: 1px solid var(--color-border-blue);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1.6rem;
  box-shadow: var(--shadow-sm);
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: var(--color-secondary-hover);
    background: var(--color-secondary-light);
  }

  &:active {
    transform: rotate(18deg) scale(0.98);
  }

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.34);
  }
`;

export const Form = styled.form`
  display: grid;
  gap: clamp(2rem, 3vw, 2.8rem);
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 18rem;
  gap: 1.2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.8rem;
  padding-top: 0.8rem;
`;

export const Feedback = styled.p<{ $success: boolean; $visible: boolean }>`
  min-height: 2.4rem;
  margin: 0;
  color: ${({ $success }) => ($success ? "#2f7045" : "#8f2d2d")};
  font-weight: 700;
  line-height: 1.5;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity 160ms ease;
`;
