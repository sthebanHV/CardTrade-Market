package com.cardtrademarket.controller;

import com.cardtrademarket.model.PaymentMethod;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.PaymentMethodRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * US-27: métodos de pago guardados. Por PCI solo se persisten marca,
 * últimos 4 dígitos y vencimiento — el CVV jamás se recibe ni se guarda.
 */
@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    private static final int MAXIMO = 5;

    private final PaymentMethodRepository repository;

    public PaymentMethodController(PaymentMethodRepository repository) {
        this.repository = repository;
    }

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private ResponseEntity<Map<String, String>> error(int status, String msg) {
        return ResponseEntity.status(status).body(Map.of("error", msg));
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        List<PaymentMethod> methods = repository.findByUserIdOrderByPredeterminadaDescCreatedAtDesc(u.getId());
        return ResponseEntity.ok(methods);
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody PaymentMethod pm) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        if (pm.getLast4() == null || !pm.getLast4().matches("\\d{4}")) {
            return error(400, "Se requieren los últimos 4 dígitos de la tarjeta");
        }
        if (pm.getExpiryMonth() == null || !pm.getExpiryMonth().matches("0[1-9]|1[0-2]")) {
            return error(400, "Mes de vencimiento inválido");
        }
        if (pm.getExpiryYear() == null || !pm.getExpiryYear().matches("20\\d{2}")) {
            return error(400, "Año de vencimiento inválido");
        }
        if (pm.getBrand() == null || pm.getBrand().isBlank()) {
            return error(400, "Indica la marca de la tarjeta");
        }
        if (repository.countByUserId(u.getId()) >= MAXIMO) {
            return error(400, "Puedes guardar máximo " + MAXIMO + " tarjetas");
        }
        pm.setId(null);
        pm.setUserId(u.getId());
        if (pm.isPredeterminada()) {
            for (PaymentMethod other : repository.findByUserIdOrderByPredeterminadaDescCreatedAtDesc(u.getId())) {
                if (other.isPredeterminada()) {
                    other.setPredeterminada(false);
                    repository.save(other);
                }
            }
        } else if (repository.countByUserId(u.getId()) == 0) {
            pm.setPredeterminada(true);
        }
        return ResponseEntity.status(201).body(repository.save(pm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        PaymentMethod propia = repository.findById(id).orElse(null);
        if (propia == null || !u.getId().equals(propia.getUserId())) return error(404, "Método no encontrado");
        repository.delete(propia);
        return ResponseEntity.ok(Map.of("ok", "Método de pago eliminado"));
    }

    @PatchMapping("/{id}/default")
    @Transactional
    public ResponseEntity<?> marcarPredeterminada(@PathVariable String id) {
        User u = usuarioActual();
        if (u == null) return error(401, "Debes iniciar sesión");
        PaymentMethod propia = repository.findById(id).orElse(null);
        if (propia == null || !u.getId().equals(propia.getUserId())) return error(404, "Método no encontrado");
        for (PaymentMethod other : repository.findByUserIdOrderByPredeterminadaDescCreatedAtDesc(u.getId())) {
            if (other.isPredeterminada()) {
                other.setPredeterminada(false);
                repository.save(other);
            }
        }
        propia.setPredeterminada(true);
        return ResponseEntity.ok(repository.save(propia));
    }
}
