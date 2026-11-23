package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Document(collection = "price_alerts")
public class PriceAlert {

    @Id
    private String id;

    private String userId;

    private String cardId;

    private Double targetPrice;

    private Boolean active;

    private Double lastNotifiedPrice;

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
