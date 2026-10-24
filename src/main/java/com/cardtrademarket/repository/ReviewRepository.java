package com.cardtrademarket.repository;

import com.cardtrademarket.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByUserId(String userId);
    List<Review> findByCardId(String cardId);
}