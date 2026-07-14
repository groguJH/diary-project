package com.example.diary.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.diary.entity.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JwtTokenProvider {

    private static final String ALGORITHM = "HmacSHA256";
    private static final Base64.Encoder BASE64_URL_ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder BASE64_URL_DECODER = Base64.getUrlDecoder();

    private final long accessTokenValiditySeconds;
    private final long refreshTokenValiditySeconds;
    private final ObjectMapper objectMapper;
    private final byte[] secret;

    public JwtTokenProvider(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-token-validity-seconds}") long accessTokenValiditySeconds,
            @Value("${app.jwt.refresh-token-validity-seconds}") long refreshTokenValiditySeconds
    ) {
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.accessTokenValiditySeconds = accessTokenValiditySeconds;
        this.refreshTokenValiditySeconds = refreshTokenValiditySeconds;
        this.objectMapper = new ObjectMapper();
    }

    public String createAccessToken(User user) {
        return createToken(user, "access", accessTokenValiditySeconds);
    }

    public String createRefreshToken(User user) {
        return createToken(user, "refresh", refreshTokenValiditySeconds);
    }

    public JwtClaims validateAccessToken(String token) {
        JwtClaims claims = parseToken(token);

        if (!"access".equals(claims.type())) {
            throw new IllegalArgumentException("Access token이 아닙니다.");
        }

        return claims;
    }

    private String createToken(User user, String type, long validitySeconds) {
        Instant now = Instant.now();
        Map<String, Object> header = new LinkedHashMap<>();
        header.put("alg", "HS256");
        header.put("typ", "JWT");

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("sub", user.getId().toString());
        payload.put("email", user.getEmail());
        payload.put("name", user.getName());
        payload.put("role", user.getRole());
        payload.put("type", type);
        payload.put("iat", now.getEpochSecond());
        payload.put("exp", now.plusSeconds(validitySeconds).getEpochSecond());

        String encodedHeader = encodeJson(header);
        String encodedPayload = encodeJson(payload);
        String unsignedToken = encodedHeader + "." + encodedPayload;

        return unsignedToken + "." + sign(unsignedToken);
    }

    private JwtClaims parseToken(String token) {
        String[] parts = token.split("\\.");

        if (parts.length != 3) {
            throw new IllegalArgumentException("JWT 형식이 올바르지 않습니다.");
        }

        String unsignedToken = parts[0] + "." + parts[1];
        String expectedSignature = sign(unsignedToken);

        if (!constantTimeEquals(expectedSignature, parts[2])) {
            throw new IllegalArgumentException("JWT 서명이 올바르지 않습니다.");
        }

        Map<String, Object> payload = decodeJson(parts[1]);
        Number exp = (Number) payload.get("exp");

        if (exp == null || exp.longValue() < Instant.now().getEpochSecond()) {
            throw new IllegalArgumentException("JWT가 만료되었습니다.");
        }

        return new JwtClaims(
                UUID.fromString((String) payload.get("sub")),
                (String) payload.get("email"),
                (String) payload.get("name"),
                (String) payload.get("role"),
                (String) payload.get("type")
        );
    }

    private String encodeJson(Map<String, Object> value) {
        try {
            return BASE64_URL_ENCODER.encodeToString(objectMapper.writeValueAsBytes(value));
        } catch (Exception exception) {
            throw new IllegalStateException("JWT 생성에 실패했습니다.", exception);
        }
    }

    private Map<String, Object> decodeJson(String value) {
        try {
            byte[] decoded = BASE64_URL_DECODER.decode(value);
            return objectMapper.readValue(decoded, new TypeReference<>() {});
        } catch (Exception exception) {
            throw new IllegalArgumentException("JWT payload를 읽을 수 없습니다.", exception);
        }
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(new SecretKeySpec(secret, ALGORITHM));
            return BASE64_URL_ENCODER.encodeToString(
                    mac.doFinal(value.getBytes(StandardCharsets.UTF_8))
            );
        } catch (Exception exception) {
            throw new IllegalStateException("JWT 서명에 실패했습니다.", exception);
        }
    }

    private boolean constantTimeEquals(String left, String right) {
        return MessageDigestSupport.constantTimeEquals(
                left.getBytes(StandardCharsets.UTF_8),
                right.getBytes(StandardCharsets.UTF_8)
        );
    }
}
