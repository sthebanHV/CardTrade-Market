package com.cardtrademarket.repository;

import com.cardtrademarket.model.ProfileChange;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProfileChangeRepository extends MongoRepository<ProfileChange, String> {
    List<ProfileChange> findTop20ByUserIdOrderByFechaDesc(String userId);
}
