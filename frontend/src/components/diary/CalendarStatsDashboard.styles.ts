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

export const DashboardStack = styled.div`
  display: grid;
  gap: clamp(2.4rem, 4vw, 3.6rem);
`;

export const DashboardCard = styled(Card)`
  gap: clamp(2rem, 3vw, 2.8rem);
  padding: clamp(2.4rem, 4vw, 4rem);
  border-radius: var(--radius-lg);

  @media (max-width: 720px) {
    padding: 2rem;
  }
`;

export const DashboardContent = styled.div<{ $wide?: boolean }>`
  display: grid;
  width: min(100%, ${({ $wide }) => ($wide ? "104rem" : "86rem")});
  margin: 0 auto;
  gap: clamp(2rem, 3vw, 2.8rem);
  padding: clamp(0.4rem, 1.5vw, 1.2rem) clamp(0rem, 2vw, 1.6rem);
`;

export const DashboardHeadingGroup = styled.div`
  display: grid;
  gap: 0.6rem;
`;

export const DashboardHeading = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 2rem;
  line-height: 1.35;
`;

export const DashboardDescription = styled.p`
  margin: 0;
  color: var(--color-text-soft);
  font-size: 1.3rem;
`;

export const CalendarWrap = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  .ant-picker-calendar {
    background: var(--color-surface);
  }

  .ant-picker-calendar-date {
    border-radius: var(--radius-sm);
  }

  @media (max-width: 640px) {
    overflow-x: auto;

    .ant-picker-calendar {
      min-width: 64rem;
    }
  }
`;

export const DateCell = styled.div`
  display: grid;
  min-height: 5.6rem;
  align-content: start;
  gap: 0.4rem;
`;

export const CountBadge = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 2.2rem;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 900;
`;

export const ChartBox = styled.div`
  width: 100%;
  height: 34rem;
`;

export const RecentList = styled.ul`
  display: grid;
  gap: 1rem;
`;

export const RecentItem = styled.li`
  display: grid;
  gap: 0.2rem;
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-surface-soft);
`;

export const RecentTitle = styled.strong`
  color: var(--color-text);
`;

export const RecentDate = styled.span`
  color: var(--color-text-soft);
  font-size: 1.2rem;
`;
