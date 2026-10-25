package com.cardtrademarket.controller;

import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.User;
import com.cardtrademarket.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    public static class OrderRequest {
        public List<String> cardIds;
        public String paymentMethod;
        public String shippingMethod;
        public Map<String, String> shippingAddress;
    }

    @Autowired
    private OrderService orderService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private boolean esAdmin(User u) {
        return u != null && "ROLE_ADMIN".equals(u.getRole());
    }

    @ExceptionHandler(OrderService.CheckoutException.class)
    public ResponseEntity<Map<String, String>> checkoutError(OrderService.CheckoutException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Order order = orderService.crearOrden(
                u.getId(),
                request.cardIds,
                request.shippingMethod,
                request.paymentMethod,
                request.shippingAddress,
                null,
                u.getNombre());
        return ResponseEntity.status(201).body(order);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String userId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        if (!esAdmin(u) && !u.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "No puedes ver las órdenes de otro usuario"));
        }
        List<Order> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable String orderId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Order order = orderService.getOrderById(orderId);
        if (!esAdmin(u) && !u.getId().equals(order.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Esta orden no te pertenece"));
        }
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId,
                                               @RequestParam String status) {
        User u = usuarioActual();
        if (!esAdmin(u)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Solo administradores pueden cambiar el estado"));
        }
        Order order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(order);
    }

    // ---------- Historiales (US-34/35) ----------

    @GetMapping("/purchases")
    public ResponseEntity<?> misCompras() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        return ResponseEntity.ok(orderService.comprasDe(u.getId()));
    }

    @GetMapping("/sales")
    public ResponseEntity<?> misVentas() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        return ResponseEntity.ok(orderService.ventasDe(u.getId()));
    }

    @GetMapping("/sales/summary")
    public ResponseEntity<?> resumenVentas() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        return ResponseEntity.ok(orderService.resumenVentas(u.getId()));
    }

    // ---------- Tracking (US-38) ----------

    @GetMapping("/{orderId}/tracking")
    public ResponseEntity<?> tracking(@PathVariable String orderId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Debes iniciar sesión"));
        }
        Order order = orderService.getOrderById(orderId);
        if (!esAdmin(u) && !u.getId().equals(order.getUserId())) {
            boolean esVendedor = order.getItems() != null && order.getItems().stream()
                    .anyMatch(i -> u.getId().equals(i.getVendedorId()));
            if (!esVendedor) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "No puedes ver el rastreo de esta orden"));
            }
        }
        return ResponseEntity.ok(orderService.trackingDe(order));
    }

    @PatchMapping("/{orderId}/tracking")
    public ResponseEntity<?> actualizarTracking(@PathVariable String orderId,
                                                @RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (!esAdmin(u)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Solo administradores pueden actualizar el rastreo"));
        }
        return ResponseEntity.ok(orderService.actualizarTracking(orderId, body));
    }
}
