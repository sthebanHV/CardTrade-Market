package com.cardtrademarket.controller;

import com.cardtrademarket.model.Notification;
import com.cardtrademarket.model.User;
import com.cardtrademarket.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {

    @Autowired
    private NotificationService notificationService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    @GetMapping
    public ResponseEntity<List<Notification>> misNotificaciones() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(notificationService.getNotificationsByUser(u.getId()));
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<?> marcarLeido(@PathVariable String notificationId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Notification n = notificationService.getNotificationById(notificationId);
        if (!u.getId().equals(n.getUserId()) && !"ROLE_ADMIN".equals(u.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "No es tu notificación"));
        }
        return ResponseEntity.ok(notificationService.marcarComoLeido(notificationId));
    }

    @PostMapping("/read-all")
    public ResponseEntity<Map<String, Object>> marcarTodasLeidas() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int n = 0;
        for (Notification notif : notificationService.getNotificationsByUser(u.getId())) {
            if (!Boolean.TRUE.equals(notif.getIsRead())) {
                notificationService.marcarComoLeido(notif.getId());
                n++;
            }
        }
        return ResponseEntity.ok(Map.of("updated", n));
    }
}
