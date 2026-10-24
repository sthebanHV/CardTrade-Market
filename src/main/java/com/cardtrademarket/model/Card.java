package com.cardtrademarket.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nombre;
    private String tipo; // Pokemon, Magic, Yu-Gi-Oh!, etc.
    private String edition; // Base Set, Obsidian Flames, etc.
    private String rarity; // Common, Uncommon, Rare, Mythic, UR
    private String condition; // New, Near Mint, Light Play, Heavy Play, Damaged
    private Double precio;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "card_imagenes", joinColumns = @JoinColumn(name = "card_id"))
    @Column(name = "imagen")
    private List<String> imagenes; // URLs de las imagenes

    private String vendedorId; // ID del usuario vendedor

    @Enumerated(EnumType.STRING)
    private Status status; // Publicado, Vendido, Reservado

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaPublicacion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaActualizacion;

    private Double precioAnterior; // Para historial de precios

    public enum Status {
        PUBLICADO, VENDIDO, RESERVADO, INACTIVO
    }
}
