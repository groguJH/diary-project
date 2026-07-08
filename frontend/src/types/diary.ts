export type DiaryMood = "happy" | "calm" | "sad" | "tired" | "angry";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: DiaryMood;
  createdAt: string;
  author?: string;
}

export interface DiaryDraft {
  title: string;
  content: string;
  date: string;
  mood: DiaryMood;
}
