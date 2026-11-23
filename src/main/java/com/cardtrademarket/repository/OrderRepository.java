package com.cardtrademarket.repository;

import com.cardtrademarket.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByStatus(String status);

    // En JPA: SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.vendedorId = ...
    // En Mongo: coincidencia sobre el array embebido items (sin necesidad de DISTINCT)
    @Query(value = "{ 'items.vendedorId': ?0 }", sort = "{ createdAt: -1 }")
    List<Order> findByVendedorId(@Param("vendedorId") String vendedorId);
}
