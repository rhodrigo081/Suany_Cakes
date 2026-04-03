package com.example.demo.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailySalesDTO(LocalDate date, BigDecimal value) {

}
