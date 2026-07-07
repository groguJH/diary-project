import styled from "styled-components";
import type { DiaryMood } from "@/src/types/diary";

const moodColors: Record<DiaryMood, { bg: string; border: string; text: string }> = {
  angry: {
    bg: "#fff0f0",
    border: "#ff8a8a",
    text: "#b13737",
  },
  calm: {
    bg: "#e5f7ff",
    border: "#78d2ff",
    text: "#27627f",
  },
  happy: {
    bg: "#fff1b8",
    border: "#ffc83d",
    text: "#775600",
  },
  sad: {
    bg: "#eef9ff",
    border: "#8fd8ff",
    text: "#315a73",
  },
  tired: {
    bg: "#fff7df",
    border: "#ffd36e",
    text: "#82601f",
  },
};

export const Fieldset = styled.fieldset`
  display: grid;
  gap: 0.8rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const Legend = styled.legend`
  margin: 0 0 0.4rem;
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 800;
`;

export const OptionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const OptionLabel = styled.label<{
  $active: boolean;
  $mood: DiaryMood;
}>`
  position: relative;
  display: inline-grid;
  width: 6.6rem;
  height: 7.2rem;
  place-items: center;
  padding: 0;
  border-radius: var(--radius-full);
  color: ${({ $mood }) => moodColors[$mood].text};
  cursor: pointer;
  outline: 0;
  transition:
    transform 160ms ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    width: ${({ $active }) => ($active ? "0.8rem" : "0")};
    height: 0.8rem;
    border-radius: var(--radius-full);
    background: ${({ $mood }) => moodColors[$mood].border};
    box-shadow: ${({ $active, $mood }) =>
      $active ? `0 0 0 0.4rem ${moodColors[$mood].bg}` : "none"};
    transform: translateX(-50%);
    transition:
      width 160ms ease,
      box-shadow 160ms ease;
  }

  &:hover {
    transform: translateY(-0.2rem);
  }

  &:has(input:focus-visible) {
    box-shadow: 0 0 0 0.3rem rgba(120, 210, 255, 0.32);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const IconSlot = styled.span<{
  $active: boolean;
  $mood: DiaryMood;
}>`
  display: inline-flex;
  width: 5.6rem;
  height: 5.6rem;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $active, $mood }) =>
      $active ? moodColors[$mood].border : "transparent"};
  border-radius: var(--radius-full);
  background: ${({ $active, $mood }) =>
    $active ? moodColors[$mood].bg : "transparent"};
  box-shadow: ${({ $active, $mood }) =>
    $active ? `0 0.8rem 1.8rem ${moodColors[$mood].bg}` : "none"};
  font-size: 3.2rem;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  ${OptionLabel}:hover & {
    background: ${({ $mood }) => moodColors[$mood].bg};
    border-color: ${({ $mood }) => moodColors[$mood].border};
  }
`;

export const LabelText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
