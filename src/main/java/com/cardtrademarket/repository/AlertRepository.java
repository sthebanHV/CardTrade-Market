package com.cardtrademarket.repository;

import com.cardtrademarket.model.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlertRepository extends MongoRepository<Alert, String> {
    List<Alert> findByUserId(String userId);
    List<Alert> findByUserIdAndIsRead(String userId, Boolean isRead);
}