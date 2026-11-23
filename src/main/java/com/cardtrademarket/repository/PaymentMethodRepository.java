package com.cardtrademarket.repository;

import com.cardtrademarket.model.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentMethodRepository extends MongoRepository<PaymentMethod, String> {
    List<PaymentMethod> findByUserIdOrderByPredeterminadaDescCreatedAtDesc(String userId);
    long countByUserId(String userId);
}
