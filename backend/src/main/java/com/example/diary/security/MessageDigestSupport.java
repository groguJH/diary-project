package com.example.diary.security;

import java.security.MessageDigest;

final class MessageDigestSupport {

    private MessageDigestSupport() {
    }

    static boolean constantTimeEquals(byte[] left, byte[] right) {
        return MessageDigest.isEqual(left, right);
    }
}
