package com.example.diary.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.diary.dto.AuthResponse;
import com.example.diary.dto.AuthUserResponse;
import com.example.diary.dto.LoginRequest;
import com.example.diary.dto.RegisterRequest;
import com.example.diary.dto.SocialLoginRequest;
import com.example.diary.entity.OAuthAccount;
import com.example.diary.entity.User;
import com.example.diary.exception.ApiException;
import com.example.diary.repository.OAuthAccountRepository;
import com.example.diary.repository.UserRepository;
import com.example.diary.security.JwtTokenProvider;

@Service
@Transactional(readOnly = true)
public class UserService {

    private static final String GOOGLE_PROVIDER = "google";

    private final JwtTokenProvider jwtTokenProvider;
    private final OAuthAccountRepository oAuthAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(
            JwtTokenProvider jwtTokenProvider,
            OAuthAccountRepository oAuthAccountRepository,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.oAuthAccountRepository = oAuthAccountRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        String name = normalizeName(request.name());
        String password = requireText(request.password(), "비밀번호를 입력해주세요.");

        if (password.length() < 8) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "비밀번호는 8자 이상 입력해주세요.");
        }

        userRepository.findByEmail(email).ifPresent(user -> {
            throw new ApiException(HttpStatus.CONFLICT, "이미 가입된 이메일입니다.");
        });

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole("USER");

        return createAuthResponse(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        String email = normalizeEmail(request.email());
        String password = requireText(request.password(), "비밀번호를 입력해주세요.");
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."));

        if (user.getPasswordHash() == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return createAuthResponse(user);
    }

    @Transactional
    public AuthResponse loginWithGoogle(SocialLoginRequest request) {
        String email = normalizeEmail(request.email());
        String name = normalizeName(request.name());
        String providerUserId = requireText(request.providerUserId(), "구글 계정 식별자가 필요합니다.");

        return oAuthAccountRepository
                .findByProviderAndProviderUserId(GOOGLE_PROVIDER, providerUserId)
                .map(OAuthAccount::getUser)
                .map(this::createAuthResponse)
                .orElseGet(() -> createGoogleUserOrAccount(email, name, providerUserId));
    }

    private AuthResponse createGoogleUserOrAccount(
            String email,
            String name,
            String providerUserId
    ) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User nextUser = new User();
                    nextUser.setEmail(email);
                    nextUser.setName(name);
                    nextUser.setRole("USER");
                    return userRepository.save(nextUser);
                });

        OAuthAccount account = new OAuthAccount();
        account.setUser(user);
        account.setProvider(GOOGLE_PROVIDER);
        account.setProviderUserId(providerUserId);
        account.setProviderEmail(email);
        oAuthAccountRepository.save(account);

        return createAuthResponse(user);
    }

    private AuthResponse createAuthResponse(User user) {
        return new AuthResponse(
                jwtTokenProvider.createAccessToken(user),
                jwtTokenProvider.createRefreshToken(user),
                new AuthUserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        user.getRole()
                )
        );
    }

    private String normalizeEmail(String email) {
        String normalizedEmail = requireText(email, "이메일을 입력해주세요.").toLowerCase();

        if (!normalizedEmail.contains("@")) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "올바른 이메일을 입력해주세요.");
        }

        return normalizedEmail;
    }

    private String normalizeName(String name) {
        String normalizedName = requireText(name, "이름을 입력해주세요.");

        if (normalizedName.length() < 2 || normalizedName.length() > 20) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "이름은 2자 이상 20자 이하로 입력해주세요.");
        }

        return normalizedName;
    }

    private String requireText(String value, String message) {
        if (value == null || value.trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, message);
        }

        return value.trim();
    }
}
