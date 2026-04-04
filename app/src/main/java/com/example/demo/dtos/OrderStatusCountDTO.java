package com.example.demo.dtos;

import com.example.demo.enums.OrderStatus;

public record OrderStatusCountDTO(OrderStatus status, Long count) {
}
