package com.cardtrademarket.repository;

import com.cardtrademarket.model.Card;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CardRepository extends MongoRepository<Card, String>, CardRepositoryCustom {

    // Listado paginado y filtrado
    List<Card> findByTipoOrderByNombreAsc(String tipo);

    List<Card> findByRarityOrderByNombreAsc(String rareza);

    List<Card> findByConditionOrderByNombreAsc(String condition);

    // Búsqueda por texto -> CardRepositoryCustom (searchByText con MongoTemplate)

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

    // incrementarVistas -> CardRepositoryCustom
}
