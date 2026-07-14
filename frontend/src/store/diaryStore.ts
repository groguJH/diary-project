"use client";

import { atom } from "@/src/store/recoilCompat";
import type { DiaryEntry } from "@/src/types/diary";

export const diaryEntriesState = atom<DiaryEntry[]>({
  key: "diaryEntriesState",
  default: [],
});
