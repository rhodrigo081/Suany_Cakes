package com.example.demo.dtos.response;

import java.math.BigDecimal;

public record DashboardStatsDTO(
        BigDecimal totalRevenue,
        BigDecimal averageTicket) {

}
