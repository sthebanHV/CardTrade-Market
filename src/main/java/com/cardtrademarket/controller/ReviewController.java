package com.cardtrademarket.controller;

import com.cardtrademarket.model.Review;
import com.cardtrademarket.model.User;
import com.cardtrademarket.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private boolean esAdmin(User u) {
        return u != null && "ROLE_ADMIN".equals(u.getRole());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String, Object> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Debes iniciar sesi\u00f3n"));
        }
        String orderId = (String) body.get("orderId");
        String cardId = (String) body.get("cardId");
        Integer rating = body.get("rating") instanceof Integer i ? i : null;
        String comment = body.get("comment") instanceof String s ? s : null;
        if (orderId == null || orderId.isBlank() || cardId == null || cardId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "orderId y cardId son obligatorios"));
        }
        Review r = reviewService.crear(u.getId(), orderId, cardId, rating, comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(r);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable String id, @RequestBody Map<String, Object> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Debes iniciar sesi\u00f3n"));
        }
        Integer rating = body.get("rating") instanceof Integer i ? i : null;
        String comment = body.get("comment") instanceof String s ? s : null;
        Review r = reviewService.actualizar(u.getId(), esAdmin(u), id, rating, comment);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Debes iniciar sesi\u00f3n"));
        }
        reviewService.eliminar(u.getId(), esAdmin(u), id);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<Review>> porOrden(@PathVariable String orderId) {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(reviewService.porOrden(orderId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> porUsuario(@PathVariable String userId) {
        return ResponseEntity.ok(reviewService.porUsuario(userId));
    }

    @GetMapping("/card/{cardId}")
    public ResponseEntity<List<Review>> porCarta(@PathVariable String cardId) {
        return ResponseEntity.ok(reviewService.porCarta(cardId));
    }
}
