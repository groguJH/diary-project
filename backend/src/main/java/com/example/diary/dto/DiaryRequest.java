package com.example.diary.dto;

public record DiaryRequest(
        String title,
        String date,
        String mood,
        String content
) {
}
