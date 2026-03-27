package com.example.demo.repositories;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.dtos.CategorySalesDTO;
import com.example.demo.dtos.DailySalesDTO;
import com.example.demo.models.OrderModel;
import com.example.demo.models.UserModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {

        List<OrderModel> findByUserOrderByCreatedAtDesc(UserModel user);

        List<OrderModel> findAllByOrderByCreatedAtDesc();

        @Query("SELECT SUM(o.totalPrice) FROM OrderModel o "
                        + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
        BigDecimal sumTotalRevenueFinishedSince(LocalDateTime startDate);

        @Query("SELECT COUNT(o) FROM OrderModel o "
                        + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED")
        Long countFinishedOrdersSince(LocalDateTime startDate);

        @Query("SELECT new com.example.demo.dtos.DailySalesDTO(CAST(o.createdAt AS LocalDateTime), SUM(o.totalPrice)) "
                        + "FROM OrderModel o "
                        + "WHERE o.createdAt >= :startDate AND o.orderStatus = com.example.demo.enums.OrderStatus.FINISHED "
                        + "GROUP BY CAST(o.createdAt AS LocalDateTime) "
                        + "ORDER BY CAST(o.createdAt AS LocalDateTime) ASC")
        List<DailySalesDTO> findDailySalesSince(LocalDateTime startDate);

        @Query("SELECT new com.example.demo.dtos.CategorySalesDTO(i.product.category, SUM(i.subtotal)) "
                        + "FROM OrderItemModel i "
                        + "WHERE i.order.createdAt >= :startDate AND i.order.orderStatus = com.example.demo.enums.OrderStatus.FINISHED "
                        + "GROUP BY i.product.category")
        List<CategorySalesDTO> findSalesByCategorySince(LocalDateTime startDate);
}
