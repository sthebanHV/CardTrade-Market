package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "collection_items")
public class CollectionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "juego")
    private String juego;

    @Column(name = "rareza")
    private String rareza;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha_adquisicion")
    private String fechaAdquisicion;

    @Column(name = "precio_pagado")
    private BigDecimal precioPagado;

    @Column(name = "notas")
    private String notas;

    @Lob
    @Column(name = "imagen_data_url")
    private String imagenDataUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public CollectionItem() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getJuego() { return juego; }
    public void setJuego(String juego) { this.juego = juego; }
    public String getRareza() { return rareza; }
    public void setRareza(String rareza) { this.rareza = rareza; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getFechaAdquisicion() { return fechaAdquisicion; }
    public void setFechaAdquisicion(String fechaAdquisicion) { this.fechaAdquisicion = fechaAdquisicion; }
    public BigDecimal getPrecioPagado() { return precioPagado; }
    public void setPrecioPagado(BigDecimal precioPagado) { this.precioPagado = precioPagado; }
    public String getNotas() { return notas; }
    public void setNotas(String notas) { this.notas = notas; }
    public String getImagenDataUrl() { return imagenDataUrl; }
    public void setImagenDataUrl(String imagenDataUrl) { this.imagenDataUrl = imagenDataUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
