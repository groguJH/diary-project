package com.example.diary.security;

import java.util.UUID;

public record JwtClaims(
        UUID userId,
        String email,
        String name,
        String role,
        String type
) {
}
