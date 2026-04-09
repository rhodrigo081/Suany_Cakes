package com.example.demo.dtos.response;

import java.math.BigDecimal;

public record ProductRankingDTO(String name,
                                String image,
                                Long totalQuantity,
                                BigDecimal totalRevenue) {
}
