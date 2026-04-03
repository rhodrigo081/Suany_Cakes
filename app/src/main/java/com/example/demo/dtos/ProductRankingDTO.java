package com.example.demo.dtos;

import java.math.BigDecimal;

public record ProductRankingDTO(String name,
                                String image,
                                Long totalQuantity,
                                BigDecimal totalRevenue) {
}
