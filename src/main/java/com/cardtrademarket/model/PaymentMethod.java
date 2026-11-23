package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

/**
 * Método de pago guardado. Por política PCI: SOLO se almacenan marca,
 * últimos 4 dígitos y vencimiento. NUNCA se recibe ni guarda CVV.
 */
@Document(collection = "payment_methods")
public class PaymentMethod {

    @Id
    private String id;

    private String userId;

    private String brand; // VISA, MASTERCARD, AMEX, DEBITO

    private String last4;

    private String expiryMonth;

    private String expiryYear;

    private String holderName;

    private boolean predeterminada;

    private LocalDateTime createdAt;

    public PaymentMethod() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getLast4() { return last4; }
    public void setLast4(String last4) { this.last4 = last4; }
    public String getExpiryMonth() { return expiryMonth; }
    public void setExpiryMonth(String expiryMonth) { this.expiryMonth = expiryMonth; }
    public String getExpiryYear() { return expiryYear; }
    public void setExpiryYear(String expiryYear) { this.expiryYear = expiryYear; }
    public String getHolderName() { return holderName; }
    public void setHolderName(String holderName) { this.holderName = holderName; }
    public boolean isPredeterminada() { return predeterminada; }
    public void setPredeterminada(boolean predeterminada) { this.predeterminada = predeterminada; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
