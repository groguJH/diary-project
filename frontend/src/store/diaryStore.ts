"use client";

import { atom } from "@/src/store/recoilCompat";
import type { DiaryEntry } from "@/src/types/diary";
import { readDiaryEntries, writeDiaryEntries } from "@/src/utils/diaryStorage";

export const diaryEntriesState = atom<DiaryEntry[]>({
  key: "diaryEntriesState",
  default: [],
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      if (typeof window === "undefined") {
        return;
      }

      setSelf(readDiaryEntries());

      const handleStorage = (event: StorageEvent) => {
        if (!event.key || event.key === "jh-diary.entries") {
          setSelf(readDiaryEntries());
        }
      };

      window.addEventListener("storage", handleStorage);

      onSet((entries) => {
        writeDiaryEntries(entries);
      });

      return () => {
        window.removeEventListener("storage", handleStorage);
      };
    },
  ],
});
