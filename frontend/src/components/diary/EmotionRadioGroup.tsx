"use client";

import type { IconType } from "react-icons";
import { FaAngry, FaMeh, FaSadTear, FaSmile, FaTired } from "react-icons/fa";
import type { DiaryMood } from "@/src/types/diary";
import {
  Fieldset,
  IconSlot,
  LabelText,
  Legend,
  OptionGrid,
  OptionLabel,
  RadioInput,
} from "./EmotionRadioGroup.styles";

export interface MoodOption {
  icon: IconType;
  label: string;
  value: DiaryMood;
}

export const moodOptions: MoodOption[] = [
  { icon: FaSmile, label: "기쁨", value: "happy" },
  { icon: FaMeh, label: "평온", value: "calm" },
  { icon: FaSadTear, label: "슬픔", value: "sad" },
  { icon: FaTired, label: "피곤", value: "tired" },
  { icon: FaAngry, label: "화남", value: "angry" },
];

interface EmotionRadioGroupProps {
  value: DiaryMood;
  onChange: (value: DiaryMood) => void;
}

export function getMoodLabel(value: DiaryMood) {
  return moodOptions.find((option) => option.value === value)?.label ?? value;
}

export function EmotionRadioGroup({ value, onChange }: EmotionRadioGroupProps) {
  return (
    <Fieldset>
      <Legend>감정</Legend>
      <OptionGrid>
        {moodOptions.map((option) => {
          const Icon = option.icon;
          const active = option.value === value;

          return (
            <OptionLabel
              $active={active}
              $mood={option.value}
              key={option.value}
            >
              <RadioInput
                aria-label={option.label}
                checked={active}
                name="mood"
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              <IconSlot
                $active={active}
                $mood={option.value}
                aria-hidden="true"
              >
                <Icon />
              </IconSlot>
              <LabelText>{option.label}</LabelText>
            </OptionLabel>
          );
        })}
      </OptionGrid>
    </Fieldset>
  );
}

export default EmotionRadioGroup;
