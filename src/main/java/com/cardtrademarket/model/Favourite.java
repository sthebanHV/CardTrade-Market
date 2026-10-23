package com.cardtrademarket.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;

@Document(collection = "favourites")
public class Favourite {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("card_id")
    private String cardId;

    @Field("created_at")
    private LocalDateTime createdAt;

    // Constructores
    public Favourite() {
        this.createdAt = LocalDateTime.now();
    }

    public Favourite(String userId, String cardId) {
        this();
        this.userId = userId;
        this.cardId = cardId;
    }

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}