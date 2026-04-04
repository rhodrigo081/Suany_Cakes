package com.example.demo.repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.dtos.CategorySalesDTO;
import com.example.demo.dtos.DailySalesDTO;
import com.example.demo.models.Order;
import com.example.demo.models.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findAllByOrderByCreatedAtDesc();

    Long countBy();

    @Query("SELECT SUM(o.totalPrice) FROM Order o "
            + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
    BigDecimal sumTotalRevenueFinishedSince(LocalDate startDate);

    @Query("SELECT COUNT(o) FROM Order o "
            + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
    Long countFinishedOrdersSince(LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.DailySalesDTO(CAST(o.createdAt AS localdate), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "WHERE o.createdAt >= :startDate " +
            "AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED " +
            "GROUP BY CAST(o.createdAt AS localdate) " +
            "ORDER BY CAST(o.createdAt AS localdate) ASC")
    List<DailySalesDTO> findDailySalesSince(@Param("startDate") LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.CategorySalesDTO(i.product.category, SUM(i.subtotal)) "
            + "FROM OrderItem i "
            + "WHERE i.order.createdAt >= :startDate AND i.order.orderStatus = com.example.demo.enums.OrderStatus.FINISHED "
            + "GROUP BY i.product.category")
    List<CategorySalesDTO> findSalesByCategorySince(LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.OrderStatusCountDTO(o.orderStatus, COUNT(o)) " +
            "FROM Order o GROUP BY o.orderStatus")
    List<OrderStatusCountDTO> countOrdersByStatus();
}
