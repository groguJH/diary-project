package com.example.diary.security;

import java.util.UUID;

public record JwtUserPrincipal(
        UUID id,
        String email,
        String name,
        String role
) {
}
