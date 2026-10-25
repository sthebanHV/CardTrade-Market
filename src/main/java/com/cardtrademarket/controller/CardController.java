package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.User;
import com.cardtrademarket.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    @ExceptionHandler(CardService.NoDuenoException.class)
    public ResponseEntity<Map<String, String>> noDueno(CardService.NoDuenoException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(CardService.ValidacionException.class)
    public ResponseEntity<Map<String, String>> validacion(CardService.ValidacionException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Map<String, String>> noEncontrado(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage() == null ? "No encontrado" : e.getMessage()));
    }

    @GetMapping
    public ResponseEntity<List<Card>> listarTarjetas(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String game,
            @RequestParam(required = false) String rarity,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) Double priceMin,
            @RequestParam(required = false) Double priceMax,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String rareza,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {

        String g = (game != null && !game.isBlank()) ? game : tipo;
        String r = (rarity != null && !rarity.isBlank()) ? rarity : rareza;
        Double min = (priceMin != null) ? priceMin : precioMin;
        Double max = (priceMax != null) ? priceMax : precioMax;

        List<Card> cartas = cardService.filtrar(q, g, r, condition, min, max, sort);
        return ResponseEntity.ok(cartas);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Card>> destacadas() {
        return ResponseEntity.ok(cardService.destacadas());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Card>> recientes() {
        return ResponseEntity.ok(cardService.recientes());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Card>> buscar(@RequestParam String q) {
        return ResponseEntity.ok(cardService.buscar(q));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> sugerencias(@RequestParam String q) {
        return ResponseEntity.ok(cardService.sugerencias(q));
    }

    @GetMapping("/compare")
    public ResponseEntity<List<Card>> comparar(@RequestParam String ids) {
        List<String> lista = java.util.Arrays.stream(ids.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .limit(3)
                .toList();
        return ResponseEntity.ok(cardService.comparar(lista));
    }

    @GetMapping("/offers")
    public ResponseEntity<List<Card>> ofertas() {
        return ResponseEntity.ok(cardService.ofertas());
    }

    @GetMapping("/my-listings")
    public ResponseEntity<?> misPublicaciones(@RequestParam(required = false) String status) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        return ResponseEntity.ok(cardService.misPublicaciones(u.getId(), status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> obtenerPorId(@PathVariable String id) {
        Card carta = cardService.verDetalle(id);
        if (carta == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(carta);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Card card) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Card nueva = cardService.crearPropia(card, u.getId());
        return ResponseEntity.status(201).body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable String id, @RequestBody Card datos) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Card propia = cardService.propia(id, u.getId());
        return ResponseEntity.ok(cardService.actualizarDatos(propia, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Card propia = cardService.propia(id, u.getId());
        cardService.eliminarPropia(propia);
        return ResponseEntity.ok(Map.of("ok", "Publicación eliminada"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> cambiarEstado(@PathVariable String id,
                                           @RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        String s = body.get("status");
        if (!"PUBLICADO".equals(s) && !"PAUSADO".equals(s)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Estado no permitido. Usa PUBLICADO o PAUSADO"));
        }
        Card propia = cardService.propia(id, u.getId());
        return ResponseEntity.ok(cardService.cambiarEstado(propia, Card.Status.valueOf(s)));
    }

    @PatchMapping("/{id}/price")
    public ResponseEntity<?> cambiarPrecio(@PathVariable String id,
                                           @RequestBody Map<String, Double> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Card propia = cardService.propia(id, u.getId());
        return ResponseEntity.ok(cardService.cambiarPrecio(propia, body.get("price")));
    }

    @PatchMapping("/{id}/sold")
    public ResponseEntity<?> marcarVendida(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Card propia = cardService.propia(id, u.getId());
        return ResponseEntity.ok(cardService.cambiarEstado(propia, Card.Status.VENDIDO));
    }

    @PutMapping("/{cardId}/vender")
    public ResponseEntity<?> marcarVendido(@PathVariable String cardId, @RequestParam String compradorId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        cardService.marcarVendido(cardId, compradorId);
        return ResponseEntity.ok().build();
    }
}
