package com.cardtrademarket.controller;

import com.cardtrademarket.market.MarketCard;
import com.cardtrademarket.market.MarketSearchResult;
import com.cardtrademarket.market.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/market")
public class MarketController {

    private static final Set<String> JUEGOS = Set.of("MAGIC", "POKEMON", "YUGIOH");

    @Autowired
    private MarketService marketService;

    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam String q,
            @RequestParam(required = false) String games,
            @RequestParam(required = false, defaultValue = "12") int limit) {
        if (q == null || q.trim().length() < 2) {
            return ResponseEntity.badRequest().body(Map.of("error", "La búsqueda debe tener al menos 2 caracteres"));
        }
        if (limit < 1 || limit > 24) limit = 12;
        List<String> juegos = parseGames(games);
        if (juegos.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Juego no soportado"));
        }
        MarketSearchResult result = marketService.buscar(q.trim(), juegos, limit);
        return ResponseEntity.ok(Map.of(
                "results", result.getResults(),
                "unavailable", result.getUnavailable()));
    }

    @GetMapping("/card/{game}/{externalId}")
    public ResponseEntity<?> detalle(@PathVariable String game, @PathVariable String externalId) {
        String g = game.toUpperCase();
        if (!JUEGOS.contains(g)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Juego no soportado"));
        }
        Optional<MarketCard.Detail> d = marketService.detalle(g, externalId);
        return d.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Carta no encontrada en el mercado")));
    }

    @PostMapping("/resolve")
    public ResponseEntity<?> resolve(@RequestBody Map<String, String> body) {
        String game = body.getOrDefault("game", "").toUpperCase();
        String name = body.getOrDefault("name", "");
        if (!JUEGOS.contains(game)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Juego no soportado"));
        }
        if (name.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Falta el nombre de la carta"));
        }
        Optional<MarketCard> match = marketService.resolver(game, name.trim());
        return match.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Sin coincidencia en el mercado")));
    }

    private List<String> parseGames(String games) {
        String raw = (games == null || games.isBlank()) ? "MAGIC,POKEMON,YUGIOH" : games;
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .map(String::toUpperCase)
                .filter(JUEGOS::contains)
                .distinct()
                .toList();
    }
}
