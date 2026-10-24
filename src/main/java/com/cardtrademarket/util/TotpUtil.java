package com.cardtrademarket.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

public final class TotpUtil {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    private static final SecureRandom RANDOM = new SecureRandom();

    private TotpUtil() {}

    public static String generateSecret() {
        byte[] buffer = new byte[20];
        RANDOM.nextBytes(buffer);
        return base32Encode(buffer);
    }

    public static String base32Encode(byte[] data) {
        StringBuilder sb = new StringBuilder();
        int buffer = 0, bitsLeft = 0;
        for (byte b : data) {
            buffer = (buffer << 8) & 0xFFFF;
            buffer |= b & 0xFF;
            bitsLeft += 8;
            while (bitsLeft >= 5) {
                sb.append(ALPHABET.charAt((buffer >> (bitsLeft - 5)) & 0x1F));
                bitsLeft -= 5;
            }
        }
        if (bitsLeft > 0) {
            sb.append(ALPHABET.charAt((buffer << (5 - bitsLeft)) & 0x1F));
        }
        return sb.toString();
    }

    private static byte[] base32Decode(String s) {
        String clean = s.toUpperCase().replaceAll("=", "");
        java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream();
        int buffer = 0, bitsLeft = 0;
        for (char c : clean.toCharArray()) {
            int idx = ALPHABET.indexOf(c);
            if (idx < 0) continue;
            buffer = (buffer << 5) | idx;
            bitsLeft += 5;
            if (bitsLeft >= 8) {
                out.write((buffer >> (bitsLeft - 8)) & 0xFF);
                bitsLeft -= 8;
            }
        }
        return out.toByteArray();
    }

    public static String generateCode(String secret, long timeStepSeconds) {
        try {
            byte[] key = base32Decode(secret);
            byte[] msg = new byte[8];
            long steps = timeStepSeconds;
            for (int i = 7; i >= 0; i--) {
                msg[i] = (byte) (steps & 0xFF);
                steps >>= 8;
            }
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(new SecretKeySpec(key, "HmacSHA1"));
            byte[] hash = mac.doFinal(msg);
            int offset = hash[hash.length - 1] & 0x0F;
            int binary = ((hash[offset] & 0x7F) << 24)
                    | ((hash[offset + 1] & 0xFF) << 16)
                    | ((hash[offset + 2] & 0xFF) << 8)
                    | (hash[offset + 3] & 0xFF);
            int code = binary % 1_000_000;
            return String.format("%06d", code);
        } catch (Exception e) {
            throw new IllegalStateException("No se pudo generar el código TOTP", e);
        }
    }

    public static String currentCode(String secret) {
        return generateCode(secret, System.currentTimeMillis() / 30000);
    }

    public static boolean verify(String secret, String code) {
        if (code == null || code.length() != 6) return false;
        long step = System.currentTimeMillis() / 30000;
        for (int i = -1; i <= 1; i++) {
            if (generateCode(secret, step + i).equals(code.trim())) return true;
        }
        return false;
    }

    public static String otpauthUrl(String secret, String account, String issuer) {
        return "otpauth://totp/" + issuer + ":" + account
                + "?secret=" + secret + "&issuer=" + issuer + "&algorithm=SHA1&digits=6&period=30";
    }
}
