package com.cardtrademarket.service;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.OrderRepository;
import com.cardtrademarket.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public static final double ENVIO_ESTANDAR = 5.99;
    public static final double ENVIO_EXPRESS = 12.99;

    public static class CheckoutException extends RuntimeException {
        public CheckoutException(String msg) { super(msg); }
    }

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    public double costoEnvio(String shippingMethod) {
        return "EXPRESS".equalsIgnoreCase(shippingMethod) ? ENVIO_EXPRESS : ENVIO_ESTANDAR;
    }

    @Transactional
    public Order crearOrden(String userId, List<String> cardIds, String shippingMethod,
                            String paymentMethod, Map<String, String> shippingAddress,
                            String guestEmail, String buyerName) {
        if (userId == null) {
            throw new CheckoutException("Debe iniciar sesión o comprar como invitado");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CheckoutException("Usuario no encontrado"));
        if (cardIds == null || cardIds.isEmpty()) {
            throw new CheckoutException("El pedido no tiene artículos");
        }
        if (shippingAddress == null || shippingAddress.isEmpty()) {
            throw new CheckoutException("Falta la dirección de envío");
        }

        // Verificar disponibilidad de cada carta (RF-04.2)
        List<Card> cartas = new ArrayList<>();
        double subtotal = 0;
        for (String id : cardIds) {
            Card c = cardRepository.findById(id)
                    .orElseThrow(() -> new CheckoutException("Una carta del pedido ya no existe"));
            if (c.getStatus() != Card.Status.PUBLICADO) {
                throw new CheckoutException("La carta \"" + c.getNombre() + "\" ya no está disponible");
            }
            cartas.add(c);
            subtotal += c.getPrecio() == null ? 0 : c.getPrecio();
        }

        double envio = costoEnvio(shippingMethod);
        Order order = new Order(userId, new ArrayList<>(cardIds), Math.round((subtotal + envio) * 100) / 100.0,
                paymentMethod, shippingAddress);
        order.setStatus("PAID"); // pago simulado: aprobado de inmediato
        order.setSubtotal(Math.round(subtotal * 100) / 100.0);
        order.setShippingMethod("EXPRESS".equalsIgnoreCase(shippingMethod) ? "EXPRESS" : "ESTANDAR");
        order.setShippingCost(envio);
        order.setGuestEmail(guestEmail);
        order.setBuyerName(buyerName != null ? buyerName : user.getNombre());
        order.setNumeroOrden(siguienteNumero());

        // Snapshot de items (US-34/35): nombre, precio y vendedor al momento de la compra
        List<com.cardtrademarket.model.OrderItem> items = new ArrayList<>();
        for (Card c : cartas) {
            items.add(new com.cardtrademarket.model.OrderItem(
                    c.getId(), c.getNombre(), c.getPrecio(), c.getVendedorId()));
        }
        order.setItems(items);

        // Tracking inicial (US-38)
        boolean express = "EXPRESS".equalsIgnoreCase(shippingMethod);
        java.time.LocalDate eta = java.time.LocalDate.now().plusDays(express ? 2 : 7);
        order.setTrackingStatus("PREPARACION");
        order.setEta(eta.toString());
        List<com.cardtrademarket.model.TrackingEvent> eventos = new ArrayList<>();
        eventos.add(new com.cardtrademarket.model.TrackingEvent(
                java.time.LocalDateTime.now(), "Pago confirmado. Preparando tu pedido.", "PREPARACION"));
        order.setTrackingEvents(eventos);

        Order guardada = orderRepository.save(order);

        // Marcar cartas como vendidas
        for (Card c : cartas) {
            c.setStatus(Card.Status.VENDIDO);
            c.setFechaActualizacion(new java.util.Date());
            cardRepository.save(c);
        }

        log.info("EMAIL (simulado) -> {}: Confirmación de compra {} - {} artículos - Total ${}",
                user.getEmail(), guardada.getNumeroOrden(), cardIds.size(), guardada.getTotal());
        return guardada;
    }

    private synchronized String siguienteNumero() {
        long n = orderRepository.count() + 1;
        return String.format("CTM-%d-%06d", Year.now().getValue(), n);
    }

    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Orden no encontrada"));
    }

    public Order updateOrderStatus(String orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        String trackingStatus = switch (status == null ? "" : status.toUpperCase()) {
            case "PAID" -> "PREPARACION";
            case "SHIPPED" -> "EN_TRANSITO";
            case "DELIVERED" -> "ENTREGADO";
            case "CANCELLED" -> "CANCELADO";
            default -> order.getTrackingStatus();
        };
        order.setTrackingStatus(trackingStatus);
        if (order.getTrackingEvents() == null) {
            order.setTrackingEvents(new ArrayList<>());
        }
        order.getTrackingEvents().add(new com.cardtrademarket.model.TrackingEvent(
                java.time.LocalDateTime.now(), "Estado actualizado a " + status, trackingStatus));
        return orderRepository.save(order);
    }

    // ---------- Historiales (US-34/35) ----------

    public List<Order> comprasDe(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Order> ventasDe(String vendedorId) {
        return orderRepository.findByVendedorId(vendedorId);
    }

    public Map<String, Object> resumenVentas(String vendedorId) {
        List<Order> ventas = ventasDe(vendedorId);
        double monto = 0;
        int unidades = 0;
        for (Order o : ventas) {
            if ("CANCELLED".equalsIgnoreCase(o.getStatus())) continue;
            if (o.getItems() != null) {
                for (com.cardtrademarket.model.OrderItem it : o.getItems()) {
                    if (vendedorId.equals(it.getVendedorId())) {
                        monto += it.getPrecioUnitario() == null ? 0 : it.getPrecioUnitario();
                        unidades++;
                    }
                }
            }
        }
        Map<String, Object> out = new java.util.LinkedHashMap<>();
        out.put("numOrdenes", ventas.size());
        out.put("unidadesVendidas", unidades);
        out.put("montoTotal", Math.round(monto * 100) / 100.0);
        out.put("promedioPorOrden", ventas.isEmpty() ? 0 : Math.round(monto / ventas.size() * 100) / 100.0);
        return out;
    }

    public Map<String, Object> trackingDe(Order order) {
        Map<String, Object> out = new java.util.LinkedHashMap<>();
        out.put("orderId", order.getId());
        out.put("numeroOrden", order.getNumeroOrden());
        out.put("status", order.getStatus());
        out.put("trackingStatus", order.getTrackingStatus());
        out.put("carrier", order.getCarrier());
        out.put("trackingNumber", order.getTrackingNumber());
        out.put("eta", order.getEta());
        out.put("shippingMethod", order.getShippingMethod());
        out.put("events", order.getTrackingEvents() == null ? List.of() : order.getTrackingEvents());
        return out;
    }

    public Order actualizarTracking(String orderId, Map<String, String> body) {
        Order order = getOrderById(orderId);
        if (body.containsKey("carrier")) order.setCarrier(body.get("carrier"));
        if (body.containsKey("trackingNumber")) order.setTrackingNumber(body.get("trackingNumber"));
        if (body.containsKey("trackingStatus")) {
            order.setTrackingStatus(body.get("trackingStatus"));
            if (order.getTrackingEvents() == null) {
                order.setTrackingEvents(new ArrayList<>());
            }
            order.getTrackingEvents().add(new com.cardtrademarket.model.TrackingEvent(
                    java.time.LocalDateTime.now(),
                    "Actualización del transportista: " + body.get("trackingStatus"),
                    body.get("trackingStatus")));
        }
        if (body.containsKey("eta")) order.setEta(body.get("eta"));
        return orderRepository.save(order);
    }
}
