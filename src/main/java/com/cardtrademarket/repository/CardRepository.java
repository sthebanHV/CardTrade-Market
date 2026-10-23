package com.cardtrademarket.repository;

import com.cardtrademarket.model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CardRepository extends MongoRepository<Card, String> {
    
    // Listado paginado y filtrado
    List<Card> findByTipoOrderByNombreAsc(String tipo);
    
    List<Card> findByRarityOrderByNombreAsc(String rareza);
    
    List<Card> findByConditionOrderByNombreAsc(String condition);
    
    // Búsqueda por texto en nombre y edición
    @Query("{ $text: { $search: ?0 } }")
    List<Card> searchByText(String query);
    
    // Búsqueda por precio rango
    List<Card> findByPrecioBetween(Double min, Double max);
    
    // Búsqueda por edición
    List<Card> findByEdition(String edition);
    
    // Cartas públicas (no vendidas)
    List<Card> findByStatus(Card.Status status);

    List<Card> findByStatusOrderByFechaPublicacionDesc(Card.Status status);
    
    // Obtener cartas del vendedor
    List<Card> findByVendedorIdOrderByFechaPublicacionDesc(String vendedorId);
}