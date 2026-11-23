package com.cardtrademarket.repository;

import com.cardtrademarket.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByUserId(String userId);
    List<Review> findByCardId(String cardId);
    List<Review> findBySellerIdOrderByCreatedAtDesc(String sellerId);
    Optional<Review> findByOrderIdAndUserId(String orderId, String userId);
}
