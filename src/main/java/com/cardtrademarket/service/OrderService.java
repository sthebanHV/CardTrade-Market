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
        return orderRepository.save(order);
    }
}
