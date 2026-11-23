package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Document(collection = "conversations")
public class Conversation {

    @Id
    private String id;

    private String participante1;

    private String participante2;

    private String cardId;

    private LocalDateTime lastMessageAt;

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
