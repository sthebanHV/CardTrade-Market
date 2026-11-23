package com.cardtrademarket.repository;

import com.cardtrademarket.model.MarketCache;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface MarketCacheRepository extends MongoRepository<MarketCache, String> {
    Optional<MarketCache> findByCacheKey(String cacheKey);
}
