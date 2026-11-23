package com.cardtrademarket.repository;

import com.cardtrademarket.model.Collection;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CollectionRepository extends MongoRepository<Collection, String> {
    List<Collection> findByUserId(String userId);
    Collection findByNameAndUserId(String name, String userId);
}