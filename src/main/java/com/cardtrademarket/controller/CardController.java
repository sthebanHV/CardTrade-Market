package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

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

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Card>> obtenerPorId(@PathVariable String id) {
        Optional<Card> carta = cardService.obtenerPorId(id);
        return ResponseEntity.ok(carta);
    }

    @PostMapping
    public ResponseEntity<Card> crear(@RequestBody Card card, @RequestParam String vendedorId) {
        Card nuevaTarjeta = cardService.crear(card, vendedorId);
        return ResponseEntity.status(201).body(nuevaTarjeta);
    }

    @PutMapping("/{id}/precio")
    public ResponseEntity<Card> actualizarPrecio(@PathVariable String id, @RequestBody Double nuevoPrecio) {
        Card cartaActualizada = cardService.actualizarPrecio(id, nuevoPrecio);
        return ResponseEntity.ok(cartaActualizada);
    }

    @PutMapping("/{cardId}/vender")
    public ResponseEntity<Void> marcarVendido(@PathVariable String cardId, @RequestParam String compradorId) {
        cardService.marcarVendido(cardId, compradorId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{cardId}/imagenes")
    public ResponseEntity<Void> actualizarImagenes(@PathVariable String cardId, @RequestBody List<String> imagenes) {
        cardService.actualizarImagenes(cardId, imagenes);
        return ResponseEntity.ok().build();
    }
}