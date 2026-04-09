package com.example.demo.repositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.example.demo.dtos.response.*;
import com.example.demo.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Order;
import com.example.demo.models.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findAllByOrderByCreatedAtDesc();


    @Query("SELECT SUM(o.totalPrice) FROM Order o "
            + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
    BigDecimal sumTotalRevenueFinishedSince(LocalDate startDate);

    Long countBy();

    @Query("SELECT COUNT(o) FROM Order o "
            + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
    Long countFinishedOrdersSince(LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.response.DailySalesDTO(CAST(o.createdAt AS localdate), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "WHERE o.createdAt >= :startDate " +
            "AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED " +
            "GROUP BY CAST(o.createdAt AS localdate) " +
            "ORDER BY CAST(o.createdAt AS localdate) ASC")
    List<DailySalesDTO> findDailySalesSince(@Param("startDate") LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.response.CategorySalesDTO(i.product.category, SUM(i.subtotal)) "
            + "FROM OrderItem i "
            + "WHERE i.order.createdAt >= :startDate AND i.order.orderStatus = com.example.demo.enums.OrderStatus.FINISHED "
            + "GROUP BY i.product.category")
    List<CategorySalesDTO> findSalesByCategorySince(LocalDate startDate);

    @Query("SELECT new com.example.demo.dtos.response.OrderStatusCountDTO(o.orderStatus, COUNT(o)) " +
            "FROM Order o GROUP BY o.orderStatus")
    List<OrderStatusCountDTO> countOrdersByStatus();

    @Query("SELECT new com.example.demo.dtos.response.OrderScheduleCountDTO(o.deliveryDate, COUNT(o)) " +
            "FROM Order o WHERE o.deliveryDate BETWEEN :start AND :end " +
            "GROUP BY o.deliveryDate ORDER BY o.deliveryDate ASC")
    List<OrderScheduleCountDTO> countOrdersByDeliveryDateRange(@Param("start") LocalDate start, @Param("end") LocalDate end);

    long countByOrderStatus(OrderStatus status);

    @Query("SELECT new com.example.demo.dtos.response.NeighborhoodRankingDTO(a.neighborhood, COUNT(o)) " +
            "FROM Order o JOIN o.shippingAddress a " +
            "GROUP BY a.neighborhood " +
            "ORDER BY COUNT(o) DESC")
    List<NeighborhoodRankingDTO> findTopNeighborhoods();

    @Query("SELECT COUNT(u) FROM User u WHERE (SELECT COUNT(o) FROM Order o WHERE o.user = u) >= 2")
    Long countUsersWithMultipleOrders();
}
