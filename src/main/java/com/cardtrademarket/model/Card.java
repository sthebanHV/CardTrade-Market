package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cards")
@CompoundIndex(name = "idx_cards_status_fecha", def = "{'status': 1, 'fechaPublicacion': -1}")
@CompoundIndex(name = "idx_cards_vendedor_status_fecha", def = "{'vendedorId': 1, 'status': 1, 'fechaPublicacion': -1}")
public class Card {

    @Id
    private String id;

    private String nombre;
    private String tipo; // Pokemon, Magic, Yu-Gi-Oh!, etc.
    private String edition; // Base Set, Obsidian Flames, etc.
    private String rarity; // Common, Uncommon, Rare, Mythic, UR
    private String condition; // New, Near Mint, Light Play, Heavy Play, Damaged
    private Double precio;

    private String descripcion;

    private Integer stock = 1;

    private Double precioOferta;

    private Date ofertaExpira;

    private List<String> imagenes; // URLs de las imagenes

    private String vendedorId; // ID del usuario vendedor

    private Status status; // Publicado, Vendido, Reservado

    private Date fechaPublicacion;

    private Date fechaActualizacion;

    private Double precioAnterior; // Para historial de precios

    private Integer vistas = 0; // Estadística de la publicación

    public enum Status {
        PUBLICADO, PAUSADO, VENDIDO, RESERVADO, INACTIVO
    }
}
