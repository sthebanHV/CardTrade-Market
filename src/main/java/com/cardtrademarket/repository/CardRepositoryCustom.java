package com.cardtrademarket.repository;

import com.cardtrademarket.model.Card;
import java.util.List;

/**
 * Métodos que en JPA eran @Query JPQL / @Modifying.
 * En MongoDB se implementan con MongoTemplate (CardRepositoryCustomImpl).
 */
public interface CardRepositoryCustom {

    /** Búsqueda de texto en nombre, tipo, edición y descripción (case-insensitive, regex escapada). */
    List<Card> searchByText(String query);

    /** Incrementa el contador de vistas de una carta. */
    int incrementarVistas(String id);
}
