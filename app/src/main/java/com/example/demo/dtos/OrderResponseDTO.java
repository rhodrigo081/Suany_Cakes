package com.example.demo.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

public record OrderResponseDTO(
        Long id,
        String customerName,
        String status,
        LocalDateTime createdAt,
        LocalDate deliveryDate,
        BigDecimal totalPrice,
        AddressResponseDTO shippingAddress,
        List<OrderItemResponseDTO> items) {
}
