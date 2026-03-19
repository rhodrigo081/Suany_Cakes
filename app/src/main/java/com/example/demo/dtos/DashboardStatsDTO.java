package com.example.demo.dtos;

import java.math.BigDecimal;

public record DashboardStatsDTO(
        BigDecimal totalRevenue,
        BigDecimal averageTicket) {

}
