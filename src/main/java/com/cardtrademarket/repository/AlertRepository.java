package com.cardtrademarket.repository;

import com.cardtrademarket.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, String> {
    List<Alert> findByUserId(String userId);
    List<Alert> findByUserIdAndIsRead(String userId, Boolean isRead);
}