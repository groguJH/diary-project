import type { DiaryDraft, DiaryEntry } from "@/src/types/diary";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.BACKEND_API_URL ??
  "http://localhost:8080";

async function requestDiaryApi<T>(
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function readErrorMessage(response: Response) {
  try {
    const body = await response.json();

    if (typeof body?.message === "string") {
      return body.message;
    }
  } catch {
    return "일기 요청을 처리하지 못했습니다.";
  }

  return "일기 요청을 처리하지 못했습니다.";
}

export function fetchDiaryEntries(accessToken: string, month?: string) {
  const query = month ? `?month=${encodeURIComponent(month)}` : "";

  return requestDiaryApi<DiaryEntry[]>(`/api/diaries${query}`, accessToken);
}

export function createDiaryEntry(accessToken: string, draft: DiaryDraft) {
  return requestDiaryApi<DiaryEntry>("/api/diaries", accessToken, {
    body: JSON.stringify(draft),
    method: "POST",
  });
}

export function updateDiaryEntry(
  accessToken: string,
  diaryEntryId: string,
  draft: DiaryDraft,
) {
  return requestDiaryApi<DiaryEntry>(
    `/api/diaries/${diaryEntryId}`,
    accessToken,
    {
      body: JSON.stringify(draft),
      method: "PUT",
    },
  );
}

export function deleteDiaryEntry(accessToken: string, diaryEntryId: string) {
  return requestDiaryApi<void>(`/api/diaries/${diaryEntryId}`, accessToken, {
    method: "DELETE",
  });
}
