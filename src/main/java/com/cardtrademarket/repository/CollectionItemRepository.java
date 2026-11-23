package com.cardtrademarket.repository;

import com.cardtrademarket.model.CollectionItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionItemRepository extends MongoRepository<CollectionItem, String>, CollectionItemRepositoryCustom {

    List<CollectionItem> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<CollectionItem> findByUserIdAndCardId(String userId, String cardId);

    long countByUserId(String userId);

    void deleteByUserIdAndCardId(String userId, String cardId);

    // buscar (filtros opcionales) -> CollectionItemRepositoryCustom
}
