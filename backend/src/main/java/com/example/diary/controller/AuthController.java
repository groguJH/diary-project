package com.example.diary.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.diary.dto.AuthResponse;
import com.example.diary.dto.LoginRequest;
import com.example.diary.dto.RegisterRequest;
import com.example.diary.dto.SocialLoginRequest;
import com.example.diary.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.register(request));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/social/google")
    public AuthResponse loginWithGoogle(@RequestBody SocialLoginRequest request) {
        return userService.loginWithGoogle(request);
    }
}
