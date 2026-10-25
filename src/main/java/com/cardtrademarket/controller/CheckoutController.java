package com.cardtrademarket.controller;

import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.UserRepository;
import com.cardtrademarket.service.OrderService;
import com.cardtrademarket.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/**
 * US-28: Compra como invitado. Crea la orden asociada a una cuenta existente
 * o genera una cuenta automática con credenciales enviadas por email (simulado).
 */
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private static final Logger log = LoggerFactory.getLogger(CheckoutController.class);

    public static class GuestRequest {
        public String email;
        public String nombre;
        public java.util.List<String> cardIds;
        public String paymentMethod;
        public String shippingMethod;
        public Map<String, String> shippingAddress;
    }

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/guest")
    public ResponseEntity<?> guestCheckout(@RequestBody GuestRequest req) {
        if (req.email == null || !req.email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Correo electrónico no válido"));
        }
        String email = req.email.toLowerCase();

        User existente = userRepository.findByEmail(email).orElse(null);
        String userId;
        String credenciales = null;

        if (existente != null) {
            // Cuenta existente: se vincula la orden (no se crea otra)
            userId = existente.getId();
        } else {
            // Crear cuenta automática con password aleatorio
            String base = email.substring(0, email.indexOf('@'))
                    .replaceAll("[^A-Za-z0-9]", "").toLowerCase();
            if (base.isEmpty()) base = "comprador";
            String username = base;
            int i = 1;
            while (userRepository.findByUsername(username).isPresent()) {
                username = base + (i++);
            }
            String password = "Ctm" + UUID.randomUUID().toString().replace("-", "").substring(0, 9) + "!";
            User nuevo = new User();
            nuevo.setUsername(username);
            nuevo.setEmail(email);
            nuevo.setNombre(req.nombre != null && !req.nombre.isBlank() ? req.nombre : username);
            nuevo.setPasswordHash(password);
            User guardado = userService.register(nuevo);
            userId = guardado.getId();
            credenciales = username + " / " + password;
            log.info("EMAIL (simulado) -> {}: Bienvenido a CardTrade. Tu cuenta fue creada. "
                    + "Usuario: {} | Contraseña: {}", email, username, password);
        }

        try {
            Order orden = orderService.crearOrden(
                    userId,
                    req.cardIds,
                    req.shippingMethod,
                    req.paymentMethod,
                    req.shippingAddress,
                    email,
                    req.nombre);

            Map<String, Object> resp = new LinkedHashMap<>();
            resp.put("orden", orden);
            resp.put("cuentaCreada", credenciales != null);
            resp.put("vinculadaACuentaExistente", credenciales == null && existente != null);
            if (credenciales != null) {
                resp.put("credenciales", credenciales);
            }
            return ResponseEntity.status(201).body(resp);
        } catch (OrderService.CheckoutException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }
}
