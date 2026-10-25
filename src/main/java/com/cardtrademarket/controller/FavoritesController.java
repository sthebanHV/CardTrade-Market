package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Favourite;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavouriteRepository repository;

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

    @GetMapping
    public ResponseEntity<?> misFavoritos() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<Map<String, Object>> out = new ArrayList<>();
        for (Favourite f : repository.findByUserId(u.getId())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", f.getId());
            m.put("cardId", f.getCardId());
            m.put("createdAt", f.getCreatedAt());
            Optional<Card> card = cardRepository.findById(f.getCardId());
            m.put("card", card.map(this::resumen).orElse(null));
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    private Map<String, Object> resumen(Card c) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", c.getId());
        m.put("nombre", c.getNombre());
        m.put("tipo", c.getTipo());
        m.put("rarity", c.getRarity());
        m.put("condition", c.getCondition());
        m.put("precio", c.getPrecio());
        m.put("precioOferta", c.getPrecioOferta());
        m.put("imagenes", c.getImagenes());
        m.put("status", c.getStatus() == null ? null : c.getStatus().name());
        m.put("vendedorId", c.getVendedorId());
        return m;
    }

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String cardId = body.get("cardId");
        if (cardId == null || cardId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "cardId es obligatorio"));
        }
        if (cardRepository.findById(cardId).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Carta no encontrada"));
        }
        if (repository.existsByUserIdAndCardId(u.getId(), cardId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Ya est\u00e1 en tus favoritos"));
        }
        Favourite f = repository.save(new Favourite(u.getId(), cardId));
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", f.getId());
        m.put("cardId", f.getCardId());
        m.put("createdAt", f.getCreatedAt());
        return ResponseEntity.status(HttpStatus.CREATED).body(m);
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<?> eliminar(@PathVariable String cardId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        repository.findByUserId(u.getId()).stream()
                .filter(f -> f.getCardId().equals(cardId))
                .findFirst()
                .ifPresent(repository::delete);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
