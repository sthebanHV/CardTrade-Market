package com.cardtrademarket.repository;

import com.cardtrademarket.model.CollectionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CollectionItemRepository extends JpaRepository<CollectionItem, String> {

    List<CollectionItem> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<CollectionItem> findByUserIdAndCardId(String userId, String cardId);

    long countByUserId(String userId);

    void deleteByUserIdAndCardId(String userId, String cardId);

    @Query("SELECT i FROM CollectionItem i WHERE i.userId = :userId AND " +
           "(:juego IS NULL OR i.juego = :juego) AND " +
           "(:rareza IS NULL OR i.rareza = :rareza) AND " +
           "(:estado IS NULL OR i.estado = :estado)")
    List<CollectionItem> buscar(@Param("userId") String userId,
                                @Param("juego") String juego,
                                @Param("rareza") String rareza,
                                @Param("estado") String estado);
}
