package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.PriceAlert;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.PriceAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/price-alerts")
public class PriceAlertController {

    @Autowired
    private PriceAlertRepository repository;

    @Autowired
    private CardRepository cardRepository;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private User exigir() {
        User u = usuarioActual();
        if (u == null) throw new IllegalStateException("No autenticado");
        return u;
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> conflict(IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> badRequest(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> misAlertas() {
        User u = exigir();
        List<Map<String, Object>> out = new ArrayList<>();
        for (PriceAlert a : repository.findByUserIdOrderByCreatedAtDesc(u.getId())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", a.getId());
            m.put("cardId", a.getCardId());
            m.put("targetPrice", a.getTargetPrice());
            m.put("active", a.getActive());
            m.put("createdAt", a.getCreatedAt());
            Card c = cardRepository.findById(a.getCardId()).orElse(null);
            m.put("cardNombre", c != null ? c.getNombre() : "Carta eliminada");
            m.put("precioActual", c != null ? c.getPrecio() : null);
            m.put("imagen", c != null && c.getImagenes() != null && !c.getImagenes().isEmpty()
                    ? c.getImagenes().get(0) : null);
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String, Object> body) {
        User u = exigir();
        String cardId = body.get("cardId") == null ? null : String.valueOf(body.get("cardId"));
        if (cardId == null || cardId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "cardId es obligatorio"));
        }
        if (cardRepository.findById(cardId).isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Carta no encontrada"));
        }
        Double target;
        try {
            target = Double.valueOf(String.valueOf(body.get("targetPrice")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "targetPrice inválido"));
        }
        if (target == null || target <= 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "El precio objetivo debe ser mayor a 0"));
        }
        if (repository.findByUserIdAndCardId(u.getId(), cardId).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Ya tienes una alerta para esta carta"));
        }
        PriceAlert a = new PriceAlert();
        a.setUserId(u.getId());
        a.setCardId(cardId);
        a.setTargetPrice(target);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(a));
    }

    @PutMapping("/{alertId}")
    public ResponseEntity<?> actualizar(@PathVariable String alertId,
                                        @RequestBody Map<String, Object> body) {
        User u = exigir();
        PriceAlert a = repository.findById(alertId)
                .orElseThrow(() -> new IllegalArgumentException("Alerta no encontrada"));
        if (!a.getUserId().equals(u.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No es tu alerta"));
        }
        if (body.containsKey("targetPrice")) {
            try {
                Double t = Double.valueOf(String.valueOf(body.get("targetPrice")));
                if (t <= 0) throw new NumberFormatException();
                a.setTargetPrice(t);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of("error", "targetPrice inválido"));
            }
        }
        if (body.containsKey("active")) {
            a.setActive(Boolean.parseBoolean(String.valueOf(body.get("active"))));
        }
        if (a.getActive() == null) a.setActive(true);
        a.setLastNotifiedPrice(null);
        return ResponseEntity.ok(repository.save(a));
    }

    @DeleteMapping("/{alertId}")
    public ResponseEntity<?> eliminar(@PathVariable String alertId) {
        User u = exigir();
        PriceAlert a = repository.findById(alertId)
                .orElseThrow(() -> new IllegalArgumentException("Alerta no encontrada"));
        if (!a.getUserId().equals(u.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No es tu alerta"));
        }
        repository.delete(a);
        return ResponseEntity.noContent().build();
    }
}
