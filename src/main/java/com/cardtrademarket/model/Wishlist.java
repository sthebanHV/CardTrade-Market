package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Document(collection = "wishlists")
public class Wishlist {

    @Id
    private String id;

    private String userId;

    private String cardId;

    private LocalDateTime createdAt;

    private String categoria; // BUSCO, INTERCAMBIO, COMPRAR

    private String prioridad; // ALTA, MEDIA, BAJA

    private String nota;

    // Constructores
    public Wishlist() {
        this.createdAt = LocalDateTime.now();
    }

    public Wishlist(String userId, String cardId) {
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

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }
    public String getNota() { return nota; }
    public void setNota(String nota) { this.nota = nota; }
}
