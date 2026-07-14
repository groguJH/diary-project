package com.example.diary.dto;

public record SocialLoginRequest(
        String email,
        String name,
        String providerUserId
) {
}
