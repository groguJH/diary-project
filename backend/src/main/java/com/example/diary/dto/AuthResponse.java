package com.example.diary.dto;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        AuthUserResponse user
) {
}
