package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "price_alerts")
public class PriceAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "target_price")
    private Double targetPrice;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "last_notified_price")
    private Double lastNotifiedPrice;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public PriceAlert() {
        this.createdAt = LocalDateTime.now();
        this.active = true;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }
    public Double getTargetPrice() { return targetPrice; }
    public void setTargetPrice(Double targetPrice) { this.targetPrice = targetPrice; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public Double getLastNotifiedPrice() { return lastNotifiedPrice; }
    public void setLastNotifiedPrice(Double lastNotifiedPrice) { this.lastNotifiedPrice = lastNotifiedPrice; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
