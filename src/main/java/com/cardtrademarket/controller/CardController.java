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
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String rareza,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {
        
        List<Card> cartas;
        
        if (tipo != null && rareza != null) {
            cartas = cardService.buscarPorTipoYRareza(tipo, rareza);
        } else if (tipo != null) {
            cartas = cardService.listarPorTipo(tipo);
        } else if (rareza != null) {
            cartas = cardService.listarPorRareza(rareza);
        } else if (precioMin != null || precioMax != null) {
            cartas = cardService.buscarPorPrecio(precioMin, precioMax);
        } else {
            cartas = cardService.listarPublicadas();
        }
        
        return ResponseEntity.ok(cartas);
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