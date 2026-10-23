package com.cardtrademarket.repository;

import com.cardtrademarket.model.Favourite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FavouriteRepository extends MongoRepository<Favourite, String> {
    List<Favourite> findByUserId(String userId);
    boolean existsByUserIdAndCardId(String userId, String cardId);
}