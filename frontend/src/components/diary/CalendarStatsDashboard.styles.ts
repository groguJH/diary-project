import { motion } from "framer-motion";
import styled from "styled-components";
import Card from "@/src/components/common/Card";
import type { DiaryMood } from "@/src/types/diary";

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
  padding: clamp(1.6rem, 2.6vw, 2.4rem) clamp(2.4rem, 4vw, 4rem)
    clamp(2rem, 3vw, 3.2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background:
    linear-gradient(180deg, rgba(255, 253, 243, 0.6), #ffffff 11rem),
    var(--color-surface);

  .ant-picker-calendar {
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: transparent;
  }

  .ant-picker-calendar-header {
    gap: 0.8rem;
    padding: 0 0 2rem;
    border-bottom: 0;
  }

  .ant-picker-panel {
    width: 100%;
    background: transparent;
  }

  .ant-picker-body {
    padding: 0;
  }

  .ant-picker-content {
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .ant-picker-content thead th {
    padding-bottom: 0.8rem;
    color: var(--color-text-soft);
    font-weight: 800;
  }

  .ant-picker-calendar-header .ant-radio-group {
    border: 0;
  }

  .ant-picker-calendar-header .ant-radio-button-wrapper {
    border-color: transparent;
    box-shadow: none;
  }

  .ant-picker-calendar-header .ant-radio-button-wrapper::before {
    display: none;
  }

  .ant-picker-calendar-header .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked) {
    color: var(--color-text-soft);
  }

  .ant-picker-calendar-header .ant-select-selector,
  .ant-picker-calendar-header .ant-radio-button-wrapper {
    border-radius: var(--radius-sm);
  }

  .ant-picker-cell {
    padding: 0.35rem;
  }

  .ant-picker-cell::before,
  .ant-picker-cell-selected::before {
    display: none;
  }

  .ant-picker-cell-inner {
    width: 100%;
    background: transparent !important;
    box-shadow: none !important;
  }

  @media (max-width: 640px) {
    overflow-x: auto;
    padding: 1.4rem 1.6rem 2rem;

    .ant-picker-calendar {
      min-width: 64rem;
    }
  }
`;

export const DateCell = styled.div<{
  $active?: boolean;
  $hasEntries?: boolean;
  $muted?: boolean;
}>`
  display: grid;
  width: 100%;
  min-height: 7.2rem;
  align-content: start;
  gap: 0.7rem;
  padding: 0.8rem;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-secondary-hover)" : "transparent")};
  border-radius: var(--radius-sm);
  background: ${({ $active, $hasEntries }) => {
    if ($active) {
      return "var(--color-surface-blue)";
    }

    if ($hasEntries) {
      return "rgba(255, 248, 217, 0.56)";
    }

    return "transparent";
  }};
  color: ${({ $muted }) =>
    $muted ? "var(--color-text-muted)" : "var(--color-text)"};
  cursor: ${({ $hasEntries }) => ($hasEntries ? "pointer" : "default")};
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ $hasEntries }) =>
      $hasEntries ? "var(--color-surface-blue)" : "transparent"};
    transform: ${({ $hasEntries }) =>
      $hasEntries ? "translateY(-1px)" : "none"};
  }
`;

export const DateNumber = styled.span`
  justify-self: end;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
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

export const DetailOverlay = styled.button<{ $open?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 160;
  display: ${({ $open }) => ($open ? "block" : "none")};
  border: 0;
  background: rgba(58, 51, 40, 0.16);
  cursor: default;
`;

export const DetailPanel = styled.aside<{ $open?: boolean }>`
  position: fixed;
  top: var(--header-height);
  right: 0;
  z-index: 170;
  display: grid;
  grid-template-rows: auto 1fr;
  width: min(42rem, calc(100vw - 2.4rem));
  height: calc(100vh - var(--header-height));
  border-left: 1px solid var(--color-border);
  background:
    linear-gradient(180deg, rgba(255, 253, 243, 0.98), #ffffff 36rem),
    var(--color-surface);
  box-shadow: -1.2rem 0 3.2rem rgba(58, 51, 40, 0.12);
  transform: translateX(${({ $open }) => ($open ? "0" : "104%")});
  transition: transform 240ms ease;

  @media (max-width: 640px) {
    top: 0;
    width: 100vw;
    height: calc(100vh - 7.6rem);
    border-left: 0;
  }
`;

export const DetailHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 2.4rem 2.4rem 1.6rem;
`;

export const DetailDate = styled.p`
  margin: 0 0 0.6rem;
  color: var(--color-text-soft);
  font-size: 1.2rem;
  font-weight: 800;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 2.2rem;
  line-height: 1.3;
`;

export const DetailCloseButton = styled.button`
  display: inline-grid;
  width: 3.6rem;
  height: 3.6rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-soft);
  transition:
    background 160ms ease,
    color 160ms ease;

  &:hover {
    background: var(--color-surface-soft);
    color: var(--color-text);
  }
`;

export const DetailBody = styled.div`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow-y: auto;
  padding: 2rem 2.4rem 2.8rem;
`;

export const DetailEntry = styled.article`
  display: grid;
  gap: 2rem;
  padding: 2.4rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.88);
`;

export const DetailMetaGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin: 0;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailMetaItem = styled.div`
  display: grid;
  gap: 0.4rem;
  min-width: 0;
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-surface-soft);

  span {
    color: var(--color-text-soft);
    font-size: 1.1rem;
    font-weight: 800;
  }

  strong {
    min-width: 0;
    overflow: hidden;
    color: var(--color-text);
    font-size: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const moodBackground: Record<DiaryMood, string> = {
  angry: "#ffe1dc",
  calm: "#e5f7ff",
  happy: "#fff1b8",
  sad: "#e9edff",
  tired: "#efe7ff",
};

export const MoodPill = styled.strong<{ $mood: DiaryMood }>`
  display: inline-flex;
  width: fit-content;
  min-height: 2.4rem;
  align-items: center;
  padding: 0.2rem 0.8rem;
  border-radius: var(--radius-full);
  background: ${({ $mood }) => moodBackground[$mood]};
  color: var(--color-text);
  font-size: 1.2rem;
`;

export const DetailText = styled.p`
  margin: 0;
  color: var(--color-text);
  font-size: 1.45rem;
  line-height: 1.8;
  white-space: pre-wrap;
`;

export const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  padding-top: 0.4rem;
`;

export const DetailActionButton = styled.button<{
  $variant?: "danger" | "ghost";
}>`
  min-height: 3.2rem;
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger" ? "#ffd2c8" : "var(--color-border)"};
  border-radius: var(--radius-sm);
  background: ${({ $variant }) => {
    if ($variant === "danger") {
      return "#fff1ef";
    }

    if ($variant === "ghost") {
      return "var(--color-surface)";
    }

    return "var(--color-primary-light)";
  }};
  color: ${({ $variant }) =>
    $variant === "danger" ? "#8f2d2d" : "var(--color-text)"};
  font-size: 1.18rem;
  font-weight: 800;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ $variant }) =>
      $variant === "danger" ? "#ffe1dc" : "var(--color-surface-soft)"};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const DetailEditField = styled.label`
  display: grid;
  gap: 0.6rem;
  color: var(--color-text-soft);
  font-size: 1.2rem;
  font-weight: 900;
`;

const editControlStyles = `
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  outline: 0;

  &:focus {
    border-color: var(--color-secondary-hover);
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.2);
  }
`;

export const DetailEditInput = styled.input`
  ${editControlStyles}
  min-height: 4.2rem;
  padding: 0 1.2rem;
  font-size: 1.5rem;
  font-weight: 900;
`;

export const DetailEditSelect = styled.select`
  ${editControlStyles}
  min-height: 3.4rem;
  padding: 0 0.8rem;
  font-size: 1.25rem;
  font-weight: 900;
`;

export const DetailEditTextarea = styled.textarea`
  ${editControlStyles}
  min-height: 14rem;
  padding: 1.2rem;
  font-size: 1.4rem;
  line-height: 1.7;
  resize: vertical;
`;

export const EmptyDetail = styled.p`
  margin: 0;
  padding: 2rem;
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
  color: var(--color-text-soft);
  font-weight: 800;
  text-align: center;
`;
