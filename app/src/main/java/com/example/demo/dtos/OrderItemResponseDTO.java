package com.example.demo.dtos;

import java.math.BigDecimal;

public record OrderItemResponseDTO(String productName,
                                   String productImage,
                                   Integer quantity,
                                   BigDecimal unitPrice,
                                   BigDecimal subtotal) {
}
