package com.example.demo.dtos.response;

import com.example.demo.enums.OrderStatus;

public record OrderStatusCountDTO(OrderStatus status, Long count) {
}
