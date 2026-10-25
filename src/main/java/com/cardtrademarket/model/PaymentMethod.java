package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

/**
 * Método de pago guardado. Por política PCI: SOLO se almacenan marca,
 * últimos 4 dígitos y vencimiento. NUNCA se recibe ni guarda CVV.
 */
@Entity
@Table(name = "payment_methods")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    private String brand; // VISA, MASTERCARD, AMEX, DEBITO

    @Column(name = "last4")
    private String last4;

    @Column(name = "expiry_month")
    private String expiryMonth;

    @Column(name = "expiry_year")
    private String expiryYear;

    @Column(name = "holder_name")
    private String holderName;

    private boolean predeterminada;

    @Column(name = "created_at")
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
