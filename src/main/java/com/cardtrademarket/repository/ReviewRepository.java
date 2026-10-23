package com.cardtrademarket.repository;

import com.cardtrademarket.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByUserId(String userId);
    List<Review> findByCardId(String cardId);
}