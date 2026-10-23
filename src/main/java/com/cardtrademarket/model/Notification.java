package com.cardtrademarket.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("type")
    private String type; // SYSTEM, ORDER_UPDATE, MESSAGE, etc.

    @Field("title")
    private String title;

    @Field("message")
    private String message;

    @Field("action_url")
    private String actionUrl; // URL para redirigir al hacer clic

    @Field("is_read")
    private Boolean isRead;

    @Field("created_at")
    private LocalDateTime createdAt;

    // Constructores
    public Notification() {
        this.createdAt = LocalDateTime.now();
        this.isRead = false;
    }

    public Notification(String userId, String type, String title, String message, String actionUrl) {
        this();
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.message = message;
        this.actionUrl = actionUrl;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getActionUrl() { return actionUrl; }
    public void setActionUrl(String actionUrl) { this.actionUrl = actionUrl; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}