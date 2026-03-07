package com.example.demo.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record OrderResponseDTO(UUID id,
        String status,
        LocalDateTime createdAt,
        LocalDate deliveryDate,
        BigDecimal totalPrice,
        AddressResponseDTO shippingAddress,
        List<OrderItemResponseDTO> items) {

}
