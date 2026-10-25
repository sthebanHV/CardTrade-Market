package com.cardtrademarket.repository;

import com.cardtrademarket.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, String> {
    
    // Listado paginado y filtrado
    List<Card> findByTipoOrderByNombreAsc(String tipo);
    
    List<Card> findByRarityOrderByNombreAsc(String rareza);
    
    List<Card> findByConditionOrderByNombreAsc(String condition);
    
    // Búsqueda por texto en nombre, tipo, edición y descripción
    @Query("SELECT c FROM Card c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', ?1, '%')) OR LOWER(c.tipo) LIKE LOWER(CONCAT('%', ?1, '%')) OR LOWER(c.edition) LIKE LOWER(CONCAT('%', ?1, '%')) OR LOWER(c.descripcion) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Card> searchByText(String query);

    // Búsqueda por precio rango
    List<Card> findByPrecioBetween(Double min, Double max);

    // Búsqueda por edición
    List<Card> findByEdition(String edition);

    // Cartas públicas (no vendidas)
    List<Card> findByStatus(Card.Status status);

    List<Card> findByStatusOrderByFechaPublicacionDesc(Card.Status status);

    List<Card> findTop8ByStatusOrderByFechaPublicacionDesc(Card.Status status);

    List<Card> findByIdIn(java.util.List<String> ids);

    List<Card> findByVendedorIdOrderByFechaPublicacionDesc(String vendedorId);

    List<Card> findByVendedorIdAndStatusOrderByFechaPublicacionDesc(String vendedorId, Card.Status status);

    long countByVendedorIdAndStatus(String vendedorId, Card.Status status);

    @org.springframework.data.jpa.repository.Modifying
    @Query("UPDATE Card c SET c.vistas = COALESCE(c.vistas, 0) + 1 WHERE c.id = :id")
    int incrementarVistas(@org.springframework.data.repository.query.Param("id") String id);
}