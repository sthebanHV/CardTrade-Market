package com.cardtrademarket.controller;

import com.cardtrademarket.model.User;
import com.cardtrademarket.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getProfile(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getMyProfile() {
        User user = usuarioActual();
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User userDetails) {
        User current = usuarioActual();
        if (current == null) return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
        userDetails.setId(current.getId());
        try {
            User updated = userService.updateProfile(userDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/profile/avatar")
    public ResponseEntity<?> uploadAvatar(@RequestBody Map<String, String> body) {
        User current = usuarioActual();
        if (current == null) return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
        String dataUrl = body.get("dataUrl");
        if (dataUrl == null || !dataUrl.startsWith("data:image/")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Imagen no válida (usa formato data URL)"));
        }
        if (dataUrl.length() > 7_500_000) {
            return ResponseEntity.badRequest().body(Map.of("error", "La imagen no debe superar los 5MB"));
        }
        User updated = userService.actualizarAvatar(current.getId(), dataUrl);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/profile/changes")
    public ResponseEntity<?> cambiosRecientes() {
        User current = usuarioActual();
        if (current == null) return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
        return ResponseEntity.ok(userService.historialCambios(current.getId()));
    }

    @GetMapping("/dashboard/{username}")
    public ResponseEntity<?> getDashboardData(@PathVariable String username) {
        return ResponseEntity.ok(userService.getDashboardData(username));
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> getPublicUser(@PathVariable String id) {
        return userService.getPublicProfile(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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
