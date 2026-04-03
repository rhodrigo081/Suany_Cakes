package com.example.demo.repositories;

import com.example.demo.dtos.ProductRankingDTO;
import com.example.demo.enums.OrderStatus;
import com.example.demo.models.Order;
import com.example.demo.models.OrderItem;
import com.example.demo.models.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {

    @Query("SELECT new com.example.demo.dtos.ProductRankingDTO(" +
            "oi.productName, oi.productImage, SUM(oi.quantity), SUM(oi.subtotal)) " +
            "FROM OrderItem oi " +
            "WHERE oi.order.orderStatus = :status " +
            "GROUP BY oi.productName, oi.productImage " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<ProductRankingDTO> findTopSellingProducts(OrderStatus status, Pageable pageable);


    @Query("SELECT new com.example.demo.dtos.ProductRankingDTO(" +
            "oi.productName, oi.productImage, SUM(oi.quantity), SUM(oi.subtotal)) " +
            "FROM OrderItem oi " +
            "WHERE oi.order.orderStatus = :status " +
            "AND oi.productName NOT IN :topProductNames " +
            "GROUP BY oi.productName, oi.productImage " +
            "ORDER BY SUM(oi.quantity) ASC")
    List<ProductRankingDTO> findLowSellingProductsExcluding(
            OrderStatus status,
            List<String> topProductNames,
            Pageable pageable
    );

    @Modifying
    @Transactional
    @Query("UPDATE OrderItem oi SET oi.product = null WHERE oi.product.id = :productId")
    void nullifyProductId(UUID productId);


}
