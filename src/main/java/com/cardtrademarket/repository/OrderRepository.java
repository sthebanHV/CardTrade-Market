package com.cardtrademarket.repository;

import com.cardtrademarket.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUserId(String userId);

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByStatus(String status);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.vendedorId = :vendedorId ORDER BY o.createdAt DESC")
    List<Order> findByVendedorId(@Param("vendedorId") String vendedorId);
}
