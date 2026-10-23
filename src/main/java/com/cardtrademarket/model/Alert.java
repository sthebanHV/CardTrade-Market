package com.cardtrademarket.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;

@Document(collection = "alerts")
public class Alert {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("type")
    private String type; // PRICE_DROP, LISTING_ADDED, OUT_OF_STOCK, etc.

    @Field("message")
    private String message;

    @Field("related_id")
    private String relatedId; // ID de la carta relacionada

    @Field("is_read")
    private Boolean isRead;

    @Field("created_at")
    private LocalDateTime createdAt;

    // Constructores
    public Alert() {
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }

    public Alert(String userId, String type, String message, String relatedId) {
        this();
        this.userId = userId;
        this.type = type;
        this.message = message;
        this.relatedId = relatedId;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getRelatedId() { return relatedId; }
    public void setRelatedId(String relatedId) { this.relatedId = relatedId; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}