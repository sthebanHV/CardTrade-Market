package com.cardtrademarket.repository;

import com.cardtrademarket.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {
    List<Address> findByUserIdOrderByPredeterminadaDescCreatedAtDesc(String userId);
    long countByUserId(String userId);
    List<Address> findByUserId(String userId);
}
