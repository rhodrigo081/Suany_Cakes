package com.example.demo.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DailySalesDTO(LocalDateTime date, BigDecimal value) {

}
