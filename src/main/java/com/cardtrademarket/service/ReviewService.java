package com.cardtrademarket.service;

import com.cardtrademarket.model.Order;
import com.cardtrademarket.model.OrderItem;
import com.cardtrademarket.model.Review;
import com.cardtrademarket.repository.OrderRepository;
import com.cardtrademarket.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationService notificationService;

    public Review crear(String userId, String orderId, String cardId, Integer rating, String comment) {
        if (rating == null || rating < 1 || rating > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El rating debe estar entre 1 y 5");
        }
        Order orden = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Orden no encontrada"));
        if (!userId.equals(orden.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo puedes reseñar tus propias compras");
        }
        if (!"DELIVERED".equals(orden.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Solo puedes reseñar una compra una vez entregada");
        }
        if (reviewRepository.findByOrderIdAndUserId(orderId, userId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya dejaste una reseña para esta compra");
        }
        OrderItem item = orden.getItems() == null ? null : orden.getItems().stream()
                .filter(i -> cardId != null && cardId.equals(i.getCardId()))
                .findFirst().orElse(null);
        if (item == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "La carta no forma parte de esta compra");
        }

        Review r = new Review(userId, cardId, rating, comment);
        r.setOrderId(orderId);
        r.setSellerId(item.getVendedorId());
        Review guardada = reviewRepository.save(r);

        try {
            notificationService.createNotification(item.getVendedorId(), "REVIEW",
                    "Nueva reseña recibida",
                    "Te calificaron con " + rating + " estrella(s) en " + item.getNombre(),
                    "/my-sales");
        } catch (Exception ignored) {
        }
        return guardada;
    }

    public Review actualizar(String userId, boolean esAdmin, String reviewId, Integer rating, String comment) {
        Review r = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reseña no encontrada"));
        if (!userId.equals(r.getUserId()) && !esAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No puedes editar esta reseña");
        }
        if (rating != null) {
            if (rating < 1 || rating > 5) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El rating debe estar entre 1 y 5");
            }
            r.setRating(rating);
        }
        if (comment != null) {
            r.setComment(comment);
        }
        r.setUpdatedAt(java.time.LocalDateTime.now());
        return reviewRepository.save(r);
    }

    public void eliminar(String userId, boolean esAdmin, String reviewId) {
        Review r = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reseña no encontrada"));
        if (!userId.equals(r.getUserId()) && !esAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No puedes eliminar esta reseña");
        }
        reviewRepository.delete(r);
    }

    public List<Review> porOrden(String orderId) {
        return reviewRepository.findAll().stream()
                .filter(r -> orderId.equals(r.getOrderId()))
                .toList();
    }

    public List<Review> porUsuario(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public List<Review> porCarta(String cardId) {
        return reviewRepository.findByCardId(cardId);
    }

    public Map<String, Object> resumenVendedor(String sellerId) {
        List<Review> rs = reviewRepository.findBySellerIdOrderByCreatedAtDesc(sellerId);
        double promedio = rs.stream().mapToInt(Review::getRating).average().orElse(0);
        return Map.of("total", rs.size(), "promedio", Math.round(promedio * 10.0) / 10.0);
    }
}
