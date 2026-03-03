package com.example.demo.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderResponseDTO(UUID id,
                               String status,
                               LocalDateTime createdAt,
                               BigDecimal totalPrice,
                               AddressResponseDTO shippingAddress,
                               List<OrderItemResponseDTO> items) {
}
