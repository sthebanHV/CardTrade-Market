package com.cardtrademarket.repository;

import com.cardtrademarket.model.PriceAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PriceAlertRepository extends JpaRepository<PriceAlert, String> {
    List<PriceAlert> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<PriceAlert> findByUserIdAndCardId(String userId, String cardId);
    List<PriceAlert> findByCardIdAndActiveTrue(String cardId);
    void deleteByUserId(String userId);
}
