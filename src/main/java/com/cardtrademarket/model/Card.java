package com.cardtrademarket.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cards")
public class Card {
    
    @Id
    private String id;
    
    private String nombre;
    private String tipo; // Pokémon, Magic, Yu-Gi-Oh!, etc.
    private String edition; // Base Set, Obsidian Flames, etc.
    private String rarity; // Common, Uncommon, Rare, Mythic, UR
    private String condition; // New, Near Mint, Light Play, Heavy Play, Damaged
    private Double precio;
    private List<String> imagenes; // URLs de las imágenes
    private String vendedorId; // ID del usuario vendedor
    private Status status; // Publicado, Vendido, Reservado
    private Date fechaPublicacion;
    private Date fechaActualizacion;
    private Double precioAnterior; // Para historial de precios
    
    public enum Status {
        PUBLICADO, VENDIDO, RESERVADO, INACTIVO
    }
}