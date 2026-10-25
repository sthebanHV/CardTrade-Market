package com.cardtrademarket.controller;

import com.cardtrademarket.model.Collection;
import com.cardtrademarket.model.CollectionItem;
import com.cardtrademarket.model.User;
import com.cardtrademarket.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/collection")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private String exigirUserId() {
        User u = usuarioActual();
        if (u == null) throw new IllegalStateException("No autenticado");
        return u.getId();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> badRequest(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> conflict(IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Map<String, String>> forbidden(SecurityException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
    }

    // ---------- Ítems de MI colección (US-29/30) ----------

    @GetMapping("/me/items")
    public ResponseEntity<List<CollectionItem>> misItems(
            @RequestParam(required = false) String juego,
            @RequestParam(required = false) String rareza,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String q) {
        String userId = exigirUserId();
        return ResponseEntity.ok(collectionService.buscarItems(userId, juego, rareza, estado, q));
    }

    @PostMapping("/me/items")
    public ResponseEntity<?> crearItem(@RequestBody Map<String, Object> body) {
        String userId = exigirUserId();
        CollectionItem item = collectionService.crearItem(userId, body);
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> actualizarItem(@PathVariable String itemId,
                                            @RequestBody Map<String, Object> body) {
        String userId = exigirUserId();
        return ResponseEntity.ok(collectionService.actualizarItem(userId, itemId, body));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> eliminarItem(@PathVariable String itemId) {
        String userId = exigirUserId();
        collectionService.eliminarItem(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    // ---------- Estadísticas (US-31) ----------

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        return ResponseEntity.ok(collectionService.stats(exigirUserId()));
    }

    // ---------- Export CSV (US-32) ----------

    @GetMapping(value = "/export", produces = "text/csv;charset=UTF-8")
    public ResponseEntity<byte[]> exportar(@RequestParam(defaultValue = "csv") String format) {
        String userId = exigirUserId();
        String csv = collectionService.exportCsv(userId);
        byte[] body = ("﻿" + csv).getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"mi-coleccion.csv\"")
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .body(body);
    }

    // ---------- Colecciones temáticas (US-33) ----------

    @PostMapping
    public ResponseEntity<Collection> crear(@RequestParam String name,
                                            @RequestParam(required = false, defaultValue = "") String description) {
        String userId = exigirUserId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(collectionService.crearColeccion(userId, name, description));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Collection>> misColecciones() {
        return ResponseEntity.ok(collectionService.coleccionesDe(exigirUserId()));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Collection>> coleccionesDeUsuario(@PathVariable String userId) {
        return ResponseEntity.ok(collectionService.coleccionesDe(userId));
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<Collection> detalle(@PathVariable String collectionId) {
        String userId = exigirUserId();
        return ResponseEntity.ok(collectionService.coleccionDe(userId, collectionId));
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<Collection> actualizar(@PathVariable String collectionId,
                                                 @RequestParam String name,
                                                 @RequestParam(required = false, defaultValue = "") String description) {
        String userId = exigirUserId();
        return ResponseEntity.ok(collectionService.actualizarColeccion(userId, collectionId, name, description));
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> eliminar(@PathVariable String collectionId) {
        collectionService.eliminarColeccion(exigirUserId(), collectionId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{collectionId}/cards")
    public ResponseEntity<?> agregarCard(@PathVariable String collectionId,
                                         @RequestBody Map<String, String> body) {
        String userId = exigirUserId();
        Collection c = collectionService.agregarCard(userId, collectionId, body.get("cardId"));
        return ResponseEntity.ok(c);
    }

    @DeleteMapping("/{collectionId}/cards/{cardId}")
    public ResponseEntity<Collection> quitarCard(@PathVariable String collectionId,
                                                 @PathVariable String cardId) {
        String userId = exigirUserId();
        return ResponseEntity.ok(collectionService.quitarCard(userId, collectionId, cardId));
    }
}
