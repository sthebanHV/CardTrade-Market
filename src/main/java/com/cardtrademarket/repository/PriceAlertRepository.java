package com.cardtrademarket.repository;

import com.cardtrademarket.model.PriceAlert;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PriceAlertRepository extends MongoRepository<PriceAlert, String> {
    List<PriceAlert> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<PriceAlert> findByUserIdAndCardId(String userId, String cardId);
    List<PriceAlert> findByCardIdAndActiveTrue(String cardId);
    void deleteByUserId(String userId);
}
