package com.cardtrademarket.repository;

import com.cardtrademarket.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, String> {
    List<Favourite> findByUserId(String userId);
    boolean existsByUserIdAndCardId(String userId, String cardId);
}