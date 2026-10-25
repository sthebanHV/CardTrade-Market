package com.cardtrademarket.controller;

import com.cardtrademarket.model.User;
import com.cardtrademarket.security.JwtTokenProvider;
import com.cardtrademarket.service.UserService;
import com.cardtrademarket.util.TotpUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCK_MINUTES = 15;
    private static final long TOKEN_HOURS_24 = 24 * 60 * 60 * 1000L;
    private static final long TOKEN_HOURS_1 = 60 * 60 * 1000L;
    private static final Map<String, TmpSession> TMP_TOKENS = new ConcurrentHashMap<>();

    private record TmpSession(String username, long expires) {}

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Value("${app.base.url}")
    private String baseUrl;

    private static boolean passwordValida(String p) {
        return p != null && p.matches("^(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$");
    }

    private static Map<String, Object> err(String msg, int status) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("error", msg);
        return m;
    }

    // ---------- US-01 Registro ----------

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User req) {
        String password = req.getPasswordHash();
        if (!passwordValida(password)) {
            return ResponseEntity.badRequest().body(err(
                    "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial", 400));
        }
        if (req.getEmail() == null || !req.getEmail().matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            return ResponseEntity.badRequest().body(err("El correo electrónico no es válido", 400));
        }
        if (userService.findByEmail(req.getEmail().toLowerCase()) != null) {
            return ResponseEntity.badRequest().body(err("El correo electrónico ya está registrado", 400));
        }
        if (req.getUsername() == null || req.getUsername().isBlank()) {
            return ResponseEntity.badRequest().body(err("El nombre de usuario es obligatorio", 400));
        }
        if (userService.findByUsername(req.getUsername()) != null) {
            return ResponseEntity.badRequest().body(err("El nombre de usuario ya está en uso", 400));
        }

        User user = userService.register(req);
        user.setVerifyToken(UUID.randomUUID().toString().replace("-", ""));
        user.setVerifyTokenExpiry(new Date(System.currentTimeMillis() + TOKEN_HOURS_24));
        user = userService.guardar(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("user", user);
        resp.put("devVerifyToken", user.getVerifyToken());
        resp.put("verifyUrl", baseUrl + "/verify-email/" + user.getVerifyToken());
        return ResponseEntity.ok(resp);
    }

    // ---------- US-03 Login (con lockout y 2FA) ----------

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        String identificador = loginRequest.getUsername();
        if (identificador == null || identificador.isBlank()
                || loginRequest.getPassword() == null) {
            return ResponseEntity.status(401).body(err("Credenciales inválidas", 401));
        }

        User user = identificador.contains("@")
                ? userService.findByEmail(identificador.toLowerCase())
                : userService.findByUsername(identificador);

        if (user == null) {
            return ResponseEntity.status(401).body(err("Credenciales inválidas", 401));
        }

        if (user.getLockedUntil() != null && user.getLockedUntil().after(new Date())) {
            long mins = (user.getLockedUntil().getTime() - System.currentTimeMillis()) / 60000 + 1;
            return ResponseEntity.status(423).body(err(
                    "Cuenta bloqueada temporalmente por intentos fallidos. Intenta de nuevo en " + mins + " minuto(s)", 423));
        }

        if (!userService.verifyPassword(loginRequest.getPassword(), user.getPasswordHash())) {
            int intentos = (user.getFailedAttempts() == null ? 0 : user.getFailedAttempts()) + 1;
            user.setFailedAttempts(intentos);
            if (intentos >= MAX_FAILED_ATTEMPTS) {
                user.setLockedUntil(new Date(System.currentTimeMillis() + LOCK_MINUTES * 60000));
                user.setFailedAttempts(0);
                userService.guardar(user);
                return ResponseEntity.status(423).body(err(
                        "Cuenta bloqueada temporalmente tras 5 intentos fallidos", 423));
            }
            userService.guardar(user);
            return ResponseEntity.status(401).body(err("Credenciales inválidas", 401));
        }

        user.setFailedAttempts(0);
        user.setLockedUntil(null);
        userService.guardar(user);

        if (Boolean.TRUE.equals(user.getTfaEnabled())) {
            String tmp = UUID.randomUUID().toString().replace("-", "");
            TMP_TOKENS.put(tmp, new TmpSession(user.getUsername(), System.currentTimeMillis() + 300000));
            purgeTmp();
            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("tfaRequired", true);
            resp.put("tmpToken", tmp);
            return ResponseEntity.ok(resp);
        }

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("token", jwtTokenProvider.generateToken(user.getUsername()));
        return ResponseEntity.ok(resp);
    }

    private void purgeTmp() {
        long now = System.currentTimeMillis();
        TMP_TOKENS.entrySet().removeIf(e -> e.getValue().expires() < now);
    }

    // ---------- US-06 Logout ----------

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(resp);
    }

    // ---------- US-04 Recuperación de contraseña ----------

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "").toLowerCase();
        User user = userService.findByEmail(email);
        String devToken = null;
        if (user != null) {
            String token = UUID.randomUUID().toString().replace("-", "");
            user.setResetToken(token);
            user.setResetTokenExpiry(new Date(System.currentTimeMillis() + TOKEN_HOURS_1));
            userService.guardar(user);
            devToken = token;
            System.out.println("[DEV-EMAIL] Restablecer contraseña: " + baseUrl + "/reset-password/" + token);
        }
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "Si el correo existe, recibirás un enlace de recuperación (expira en 1 hora)");
        if (devToken != null) {
            resp.put("devResetToken", devToken);
            resp.put("resetUrl", baseUrl + "/reset-password/" + devToken);
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String password = body.get("password");
        if (token == null || password == null) {
            return ResponseEntity.badRequest().body(err("Token y contraseña requeridos", 400));
        }
        User user = userService.findByResetToken(token);
        if (user == null || user.getResetTokenExpiry() == null
                || user.getResetTokenExpiry().before(new Date())) {
            return ResponseEntity.badRequest().body(err("El enlace de recuperación no es válido o expiró", 400));
        }
        if (!passwordValida(password)) {
            return ResponseEntity.badRequest().body(err(
                    "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial", 400));
        }
        user.setPasswordHash(userService.encode(password));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        user.setFailedAttempts(0);
        user.setLockedUntil(null);
        user.setFechaUltimoCambioPassword(new Date());
        userService.guardar(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "Contraseña restablecida exitosamente");
        return ResponseEntity.ok(resp);
    }

    // ---------- US-05 Cambio de contraseña ----------

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));

        String actual = body.get("currentPassword");
        String nueva = body.get("newPassword");
        if (!userService.verifyPassword(actual, user.getPasswordHash())) {
            return ResponseEntity.badRequest().body(err("La contraseña actual es incorrecta", 400));
        }
        if (!passwordValida(nueva)) {
            return ResponseEntity.badRequest().body(err(
                    "La nueva contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial", 400));
        }
        user.setPasswordHash(userService.encode(nueva));
        user.setFechaUltimoCambioPassword(new Date());
        userService.guardar(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "Contraseña actualizada. Cierra sesión e inicia de nuevo");
        return ResponseEntity.ok(resp);
    }

    // ---------- US-09 Verificación de email ----------

    @PostMapping("/verify-email")
    public ResponseEntity<?> sendVerifyEmail(@RequestBody(required = false) Map<String, String> body) {
        User user = usuarioActual();
        if (user == null && body != null && body.containsKey("email")) {
            user = userService.findByEmail(body.get("email").toLowerCase());
        }
        if (user == null) return ResponseEntity.status(404).body(err("Usuario no encontrado", 404));

        String token = UUID.randomUUID().toString().replace("-", "");
        user.setVerifyToken(token);
        user.setVerifyTokenExpiry(new Date(System.currentTimeMillis() + TOKEN_HOURS_24));
        userService.guardar(user);
        System.out.println("[DEV-EMAIL] Verificar correo: " + baseUrl + "/verify-email/" + token);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "Correo de verificación enviado (expira en 24 horas)");
        resp.put("devVerifyToken", token);
        resp.put("verifyUrl", baseUrl + "/verify-email/" + token);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/verify-email/{token}")
    public ResponseEntity<?> confirmVerifyEmail(@PathVariable String token) {
        User user = userService.findByVerifyToken(token);
        if (user == null || user.getVerifyTokenExpiry() == null
                || user.getVerifyTokenExpiry().before(new Date())) {
            return ResponseEntity.badRequest().body(err("El enlace de verificación no es válido o expiró", 400));
        }
        user.setEmailVerified(true);
        if (user.getPendingEmail() != null && !user.getPendingEmail().isBlank()) {
            user.setEmail(user.getPendingEmail().toLowerCase());
            user.setPendingEmail(null);
        }
        user.setVerifyToken(null);
        user.setVerifyTokenExpiry(null);
        userService.guardar(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "¡Cuenta activada! Tu correo fue verificado");
        resp.put("verified", true);
        return ResponseEntity.ok(resp);
    }

    // ---------- US-08 Autenticación de dos factores ----------

    @PostMapping("/2fa/enable")
    public ResponseEntity<?> enable2fa() {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));
        if (Boolean.TRUE.equals(user.getTfaEnabled())) {
            return ResponseEntity.badRequest().body(err("2FA ya está activo", 400));
        }

        String secret = TotpUtil.generateSecret();
        user.setTfaSecret(secret);
        userService.guardar(user);

        String otpauth = TotpUtil.otpauthUrl(secret, user.getUsername(), "CardTrade Market");
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("secret", secret);
        resp.put("otpauthUrl", otpauth);
        resp.put("qrUrl", "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="
                + URLEncoder.encode(otpauth, StandardCharsets.UTF_8));
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/2fa/verify")
    public ResponseEntity<?> verify2fa(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String tmpToken = body.get("tmpToken");

        // Flujo de login: tmpToken presente
        if (tmpToken != null) {
            purgeTmp();
            TmpSession session = TMP_TOKENS.get(tmpToken);
            if (session == null) {
                return ResponseEntity.status(401).body(err("Sesión 2FA expirada. Inicia sesión de nuevo", 401));
            }
            User user = userService.findByUsername(session.username());
            if (user == null || !Boolean.TRUE.equals(user.getTfaEnabled()) || user.getTfaSecret() == null) {
                return ResponseEntity.status(401).body(err("2FA no disponible", 401));
            }
            boolean ok = TotpUtil.verify(user.getTfaSecret(), code)
                    || usarBackupCode(user, code);
            if (!ok) {
                return ResponseEntity.status(401).body(err("Código de verificación inválido", 401));
            }
            TMP_TOKENS.remove(tmpToken);
            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("token", jwtTokenProvider.generateToken(user.getUsername()));
            return ResponseEntity.ok(resp);
        }

        // Flujo de activación
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));
        if (user.getTfaSecret() == null) {
            return ResponseEntity.badRequest().body(err("Primero genera el secreto con /2fa/enable", 400));
        }
        if (!TotpUtil.verify(user.getTfaSecret(), code)) {
            return ResponseEntity.badRequest().body(err("Código de verificación inválido", 400));
        }

        List<String> codes = generarBackupCodes();
        user.setTfaEnabled(true);
        user.setTfaBackupCodes(String.join(",", codes));
        userService.guardar(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "2FA activado correctamente");
        resp.put("backupCodes", codes);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/2fa/disable")
    public ResponseEntity<?> disable2fa(@RequestBody Map<String, String> body) {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));
        if (!userService.verifyPassword(body.get("password"), user.getPasswordHash())) {
            return ResponseEntity.badRequest().body(err("Contraseña incorrecta", 400));
        }
        user.setTfaEnabled(false);
        user.setTfaSecret(null);
        user.setTfaBackupCodes(null);
        userService.guardar(user);
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("message", "2FA desactivado");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/2fa/backup-codes")
    public ResponseEntity<?> backupCodes() {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));
        List<String> codes = user.getTfaBackupCodes() == null || user.getTfaBackupCodes().isBlank()
                ? List.of()
                : Arrays.asList(user.getTfaBackupCodes().split(","));
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("backupCodes", codes);
        return ResponseEntity.ok(resp);
    }

    private List<String> generarBackupCodes() {
        Random rnd = new Random();
        String[] alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".split("");
        List<String> codes = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < 12; j++) {
                if (j > 0 && j % 4 == 0) sb.append('-');
                sb.append(alpha[rnd.nextInt(alpha.length)]);
            }
            codes.add(sb.toString());
        }
        return codes;
    }

    private boolean usarBackupCode(User user, String code) {
        if (user.getTfaBackupCodes() == null || code == null) return false;
        List<String> codes = new ArrayList<>(Arrays.asList(user.getTfaBackupCodes().split(",")));
        String upper = code.trim().toUpperCase();
        if (!codes.contains(upper)) return false;
        codes.remove(upper);
        user.setTfaBackupCodes(String.join(",", codes));
        userService.guardar(user);
        return true;
    }

    // ---------- /me ----------

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(err("No autenticado", 401));
        return ResponseEntity.ok(user);
    }

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }
}
