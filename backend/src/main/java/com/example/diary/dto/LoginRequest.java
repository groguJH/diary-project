package com.example.diary.dto;

public record LoginRequest(
        String email,
        String password
) {
}
