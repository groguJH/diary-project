import type { DiaryDraft, DiaryEntry } from "@/src/types/diary";

const STORAGE_KEY = "jh-diary.entries";

export function readDiaryEntries(): DiaryEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawEntries = window.localStorage.getItem(STORAGE_KEY);

  if (!rawEntries) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawEntries);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeDiaryEntries(entries: DiaryEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function createDiaryEntry(draft: DiaryDraft): DiaryEntry {
  const createdAt = new Date().toISOString();

  return {
    ...draft,
    createdAt,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

export function saveDiaryEntry(draft: DiaryDraft): DiaryEntry {
  const nextEntry = createDiaryEntry(draft);
  const entries = readDiaryEntries();

  writeDiaryEntries([nextEntry, ...entries]);

  return nextEntry;
}
