package com.cardtrademarket.repository;

import com.cardtrademarket.model.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WishlistRepository extends MongoRepository<Wishlist, String> {
    List<Wishlist> findByUserId(String userId);
    boolean existsByUserIdAndCardId(String userId, String cardId);
}