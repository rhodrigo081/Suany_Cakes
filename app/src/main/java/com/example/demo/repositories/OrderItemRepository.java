package com.example.demo.repositories;

import com.example.demo.enums.OrderStatus;
import com.example.demo.models.OrderModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderModel, UUID> {

    @Query("SELECT oi.product.id FROM OrderItemModel oi " +
            "WHERE oi.order.orderStatus = :status " +
            "GROUP BY oi.product.id " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<UUID> findTopSellingProductIds(OrderStatus status, Pageable pageable);
}
