package com.cardtrademarket.repository;

import com.cardtrademarket.model.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddressRepository extends MongoRepository<Address, String> {
    List<Address> findByUserIdOrderByPredeterminadaDescCreatedAtDesc(String userId);
    long countByUserId(String userId);
    List<Address> findByUserId(String userId);
}
