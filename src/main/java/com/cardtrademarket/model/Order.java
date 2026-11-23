package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "orders")
@CompoundIndex(name = "idx_orders_user_fecha", def = "{'userId': 1, 'createdAt': -1}")
@CompoundIndex(name = "idx_orders_status", def = "{'status': 1}")
public class Order {

    @Id
    private String id;

    private String userId;

    private List<String> cardIds;

    private Double total;

    private String status; // PENDING, PAID, SHIPPED, DELIVERED, CANCELLED

    private String paymentMethod;

    private Map<String, String> shippingAddress;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String numeroOrden; // CTM-2026-000001

    private Double subtotal;

    private String shippingMethod; // ESTANDAR | EXPRESS

    private Double shippingCost;

    private String guestEmail; // nullable: compra como invitado

    private String buyerName;

    private List<OrderItem> items;

    private String carrier;

    private String trackingNumber;

    private String trackingStatus; // PREPARACION, EN_TRANSITO, EN_REPARTO, ENTREGADO

    private String eta; // fecha estimada ISO

    private List<TrackingEvent> trackingEvents;

    // Constructores
    public Order() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Order(String userId, List<String> cardIds, Double total, String paymentMethod, Map<String, String> shippingAddress) {
        this();
        this.userId = userId;
        this.cardIds = cardIds;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<String> getCardIds() { return cardIds; }
    public void setCardIds(List<String> cardIds) { this.cardIds = cardIds; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public Map<String, String> getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(Map<String, String> shippingAddress) { this.shippingAddress = shippingAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getNumeroOrden() { return numeroOrden; }
    public void setNumeroOrden(String numeroOrden) { this.numeroOrden = numeroOrden; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }

    public String getShippingMethod() { return shippingMethod; }
    public void setShippingMethod(String shippingMethod) { this.shippingMethod = shippingMethod; }

    public Double getShippingCost() { return shippingCost; }
    public void setShippingCost(Double shippingCost) { this.shippingCost = shippingCost; }

    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public String getCarrier() { return carrier; }
    public void setCarrier(String carrier) { this.carrier = carrier; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getTrackingStatus() { return trackingStatus; }
    public void setTrackingStatus(String trackingStatus) { this.trackingStatus = trackingStatus; }

    public String getEta() { return eta; }
    public void setEta(String eta) { this.eta = eta; }

    public List<TrackingEvent> getTrackingEvents() { return trackingEvents; }
    public void setTrackingEvents(List<TrackingEvent> trackingEvents) { this.trackingEvents = trackingEvents; }
}
