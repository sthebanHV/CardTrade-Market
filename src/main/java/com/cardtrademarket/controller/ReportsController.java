package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Report;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportRepository reportRepository;

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

    @PostMapping
    public ResponseEntity<?> reportar(@RequestBody Map<String, String> body) {
        if (usuarioActual() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión para reportar"));
        }
        String cardId = body.get("cardId");
        String motivo = body.get("motivo");
        String detalles = body.get("detalles");

        if (cardId == null || cardId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "cardId es obligatorio"));
        }
        Optional<Card> card = cardRepository.findById(cardId);
        if (card.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Publicación no encontrada"));
        }
        boolean motivoValido = false;
        for (Report.Motivo m : Report.Motivo.values()) {
            if (m.name().equals(motivo)) {
                motivoValido = true;
                break;
            }
        }
        if (!motivoValido) {
            return ResponseEntity.badRequest().body(Map.of("error", "Motivo inválido"));
        }

        Report r = new Report();
        r.setCardId(cardId);
        r.setMotivo(motivo);
        r.setDetalles(detalles != null && detalles.length() > 1000 ? detalles.substring(0, 1000) : detalles);
        r.setFecha(new java.util.Date());
        r.setEstado("PENDIENTE");
        reportRepository.save(r);

        return ResponseEntity.status(201).body(Map.of(
                "ok", "Reporte enviado. El equipo de CardTrade lo revisará pronto."
        ));
    }
}
