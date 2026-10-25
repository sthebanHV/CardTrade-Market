package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.User;
import com.cardtrademarket.model.Wishlist;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    public static final String[] CATEGORIAS = {"BUSCO", "INTERCAMBIO", "COMPRAR"};
    public static final String[] PRIORIDADES = {"ALTA", "MEDIA", "BAJA"};

    @Autowired
    private WishlistRepository repository;

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

    private Map<String, Object> enriquecer(Wishlist w) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", w.getId());
        m.put("cardId", w.getCardId());
        m.put("categoria", w.getCategoria());
        m.put("prioridad", w.getPrioridad());
        m.put("nota", w.getNota());
        m.put("createdAt", w.getCreatedAt());
        Optional<Card> card = cardRepository.findById(w.getCardId());
        if (card.isPresent()) {
            Card c = card.get();
            Map<String, Object> cm = new LinkedHashMap<>();
            cm.put("id", c.getId());
            cm.put("nombre", c.getNombre());
            cm.put("tipo", c.getTipo());
            cm.put("rarity", c.getRarity());
            cm.put("precio", c.getPrecio());
            cm.put("imagenes", c.getImagenes());
            cm.put("status", c.getStatus() == null ? null : c.getStatus().name());
            m.put("card", cm);
        } else {
            m.put("card", null);
        }
        return m;
    }

    @GetMapping
    public ResponseEntity<?> miLista() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<Map<String, Object>> out = new ArrayList<>();
        repository.findByUserId(u.getId()).forEach(w -> out.add(enriquecer(w)));
        return ResponseEntity.ok(out);
    }

    @GetMapping("/public/{userId}")
    public ResponseEntity<?> listaPublica(@PathVariable String userId) {
        List<Map<String, Object>> out = new ArrayList<>();
        repository.findByUserId(userId).forEach(w -> out.add(enriquecer(w)));
        return ResponseEntity.ok(out);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String, String> body) {
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
        String categoria = validar(body.get("categoria"), CATEGORIAS, "COMPRAR");
        String prioridad = validar(body.get("prioridad"), PRIORIDADES, "MEDIA");
        if (repository.existsByUserIdAndCardId(u.getId(), cardId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Ya est\u00e1 en tu lista"));
        }
        Wishlist w = new Wishlist(u.getId(), cardId);
        w.setCategoria(categoria);
        w.setPrioridad(prioridad);
        w.setNota(cortar(body.get("nota"), 500));
        Wishlist guardada = repository.save(w);
        return ResponseEntity.status(HttpStatus.CREATED).body(enriquecer(guardada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable String id, @RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        Optional<Wishlist> opt = repository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Deseo no encontrado"));
        }
        Wishlist w = opt.get();
        if (!u.getId().equals(w.getUserId()) && !"ROLE_ADMIN".equals(u.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No es tu deseo"));
        }
        if (body.containsKey("categoria")) {
            w.setCategoria(validar(body.get("categoria"), CATEGORIAS, "COMPRAR"));
        }
        if (body.containsKey("prioridad")) {
            w.setPrioridad(validar(body.get("prioridad"), PRIORIDADES, "MEDIA"));
        }
        if (body.containsKey("nota")) {
            w.setNota(cortar(body.get("nota"), 500));
        }
        return ResponseEntity.ok(enriquecer(repository.save(w)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        Optional<Wishlist> opt = repository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(Map.of("ok", true));
        }
        if (!u.getId().equals(opt.get().getUserId()) && !"ROLE_ADMIN".equals(u.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No es tu deseo"));
        }
        repository.delete(opt.get());
        return ResponseEntity.ok(Map.of("ok", true));
    }

    private String validar(String valor, String[] permitidos, String defecto) {
        if (valor == null) {
            return defecto;
        }
        for (String p : permitidos) {
            if (p.equals(valor)) {
                return p;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valor inv\u00e1lido");
    }

    private String cortar(String s, int max) {
        if (s == null) {
            return null;
        }
        return s.length() > max ? s.substring(0, max) : s;
    }
}
