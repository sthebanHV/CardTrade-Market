package com.cardtrademarket.repository;

import com.cardtrademarket.model.MarketCache;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MarketCacheRepository extends JpaRepository<MarketCache, Long> {
    Optional<MarketCache> findByCacheKey(String cacheKey);
}
