package com.cardtrademarket.repository;

import com.cardtrademarket.model.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, String> {
    List<Collection> findByUserId(String userId);
    Collection findByNameAndUserId(String name, String userId);
}