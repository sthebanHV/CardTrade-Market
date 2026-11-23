package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "collection_items")
@CompoundIndex(name = "idx_collitems_user_fecha", def = "{'userId': 1, 'createdAt': -1}")
public class CollectionItem {

    @Id
    private String id;

    private String userId;

    private String cardId;

    private String nombre;

    private String juego;

    private String rareza;

    private String estado;

    private String fechaAdquisicion;

    private BigDecimal precioPagado;

    private String notas;

    private String imagenDataUrl;

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
