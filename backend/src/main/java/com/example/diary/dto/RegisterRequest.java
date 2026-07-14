package com.example.diary.dto;

public record RegisterRequest(
        String email,
        String name,
        String password
) {
}
