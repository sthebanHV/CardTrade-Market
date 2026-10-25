package com.cardtrademarket.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_cards", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "card_id")
    private List<String> cardIds;

    @Column(name = "total")
    private Double total;

    @Column(name = "status")
    private String status; // PENDING, PAID, SHIPPED, DELIVERED, CANCELLED

    @Column(name = "payment_method")
    private String paymentMethod;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_shipping_address", joinColumns = @JoinColumn(name = "order_id"))
    @MapKeyColumn(name = "addr_key")
    @Column(name = "addr_value")
    private Map<String, String> shippingAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "numero_orden")
    private String numeroOrden; // CTM-2026-000001

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "shipping_method")
    private String shippingMethod; // ESTANDAR | EXPRESS

    @Column(name = "shipping_cost")
    private Double shippingCost;

    @Column(name = "guest_email")
    private String guestEmail; // nullable: compra como invitado

    @Column(name = "buyer_name")
    private String buyerName;

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
}
