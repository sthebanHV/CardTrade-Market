package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlists")
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "categoria", length = 20)
    private String categoria; // BUSCO, INTERCAMBIO, COMPRAR

    @Column(name = "prioridad", length = 10)
    private String prioridad; // ALTA, MEDIA, BAJA

    @Column(name = "nota", length = 500)
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
