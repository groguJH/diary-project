package com.example.diary.dto;

import java.util.UUID;

public record AuthUserResponse(
        UUID id,
        String email,
        String name,
        String role
) {
}
