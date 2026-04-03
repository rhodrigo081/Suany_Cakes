package com.example.demo.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.CategorySalesDTO;
import com.example.demo.dtos.DailySalesDTO;
import com.example.demo.dtos.DashboardStatsDTO;
import com.example.demo.repositories.OrderRepository;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;

    private LocalDate getThirtyDaysAgo() {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);

        return thirtyDaysAgo;
    }

    public DashboardStatsDTO getDashboardStats() {

        BigDecimal totalRevenue = orderRepository.sumTotalRevenueFinishedSince(getThirtyDaysAgo());
        totalRevenue = (totalRevenue != null) ? totalRevenue : BigDecimal.ZERO;

        Long count = orderRepository.countFinishedOrdersSince(getThirtyDaysAgo());
        BigDecimal averageTicket = (count > 0)
                ? totalRevenue.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return new DashboardStatsDTO(totalRevenue, averageTicket);
    }

    public List<DailySalesDTO> getThirtyDaysAgoSales() {
        List<DailySalesDTO> dailySales = orderRepository.findDailySalesSince(getThirtyDaysAgo());

        return dailySales;
    }

    public List<CategorySalesDTO> getSalesByCategory() {
        List<CategorySalesDTO> categorySales = orderRepository.findSalesByCategorySince(getThirtyDaysAgo());

        if (getDashboardStats().totalRevenue().compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal finalTotal = getDashboardStats().totalRevenue();

            for (CategorySalesDTO cat : categorySales) {
                double pct = (cat.getValue().doubleValue() / finalTotal.doubleValue()) * 100;

                cat.setPercentage(Math.round(pct * 100.0) / 100.0);
            }
        }

        return categorySales;
    }
}
