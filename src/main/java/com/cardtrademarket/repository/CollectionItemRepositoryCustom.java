package com.cardtrademarket.repository;

import com.cardtrademarket.model.CollectionItem;
import java.util.List;

/**
 * Filtro de ítems de colección con parámetros opcionales (null = sin filtro).
 * En JPA era un @Query JPQL con ":param IS NULL OR ..."; en MongoDB se construye
 * condicionalmente con Criteria (CollectionItemRepositoryCustomImpl).
 */
public interface CollectionItemRepositoryCustom {

    List<CollectionItem> buscar(String userId, String juego, String rareza, String estado);
}
