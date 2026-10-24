package com.cardtrademarket.repository;

import com.cardtrademarket.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, String> {
    List<Wishlist> findByUserId(String userId);
    boolean existsByUserIdAndCardId(String userId, String cardId);
}