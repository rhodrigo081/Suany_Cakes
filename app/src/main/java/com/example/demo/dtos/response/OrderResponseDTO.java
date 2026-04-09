package com.example.demo.dtos.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderResponseDTO(
        Long id,
        String customerName,
        String status,
        LocalDate createdAt,
        LocalDate deliveryDate,
        BigDecimal totalPrice,
        AddressResponseDTO shippingAddress,
        List<OrderItemResponseDTO> items) {
}
