package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Document(collection = "messages")
@CompoundIndex(name = "idx_messages_conv_fecha", def = "{'conversationId': 1, 'createdAt': 1}")
public class Message {

    @Id
    private String id;

    private String conversationId;

    private String senderId;

    private String contenido;

    private Boolean leido = false;

    private LocalDateTime createdAt;

    public Message() {
        this.createdAt = LocalDateTime.now();
    }

    public Message(String conversationId, String senderId, String contenido) {
        this();
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.contenido = contenido;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getConversationId() { return conversationId; }
    public void setConversationId(String conversationId) { this.conversationId = conversationId; }
    public String getSenderId() { return senderId; }
    public void setSenderId(String senderId) { this.senderId = senderId; }
    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }
    public Boolean getLeido() { return leido; }
    public void setLeido(Boolean leido) { this.leido = leido; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
