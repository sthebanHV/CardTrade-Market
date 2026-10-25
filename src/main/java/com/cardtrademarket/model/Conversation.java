package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "participante1")
    private String participante1;

    @Column(name = "participante2")
    private String participante2;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Conversation() {
        this.createdAt = LocalDateTime.now();
        this.lastMessageAt = LocalDateTime.now();
    }

    public Conversation(String participante1, String participante2, String cardId) {
        this();
        this.participante1 = participante1;
        this.participante2 = participante2;
        this.cardId = cardId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getParticipante1() { return participante1; }
    public void setParticipante1(String participante1) { this.participante1 = participante1; }
    public String getParticipante2() { return participante2; }
    public void setParticipante2(String participante2) { this.participante2 = participante2; }
    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }
    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
