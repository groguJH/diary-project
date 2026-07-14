package com.example.diary.dto;

import com.example.diary.entity.DiaryEntity;

public record DiaryResponse(
        String id,
        String title,
        String content,
        String date,
        String mood,
        String createdAt,
        String author
) {

    public static DiaryResponse from(DiaryEntity diaryEntry) {
        return from(diaryEntry, diaryEntry.getUser().getName());
    }

    public static DiaryResponse from(DiaryEntity diaryEntry, String author) {
        return new DiaryResponse(
                diaryEntry.getId().toString(),
                diaryEntry.getTitle(),
                diaryEntry.getContent(),
                diaryEntry.getDiaryDate().toString(),
                diaryEntry.getMood(),
                diaryEntry.getCreatedAt().toString(),
                author
        );
    }
}
