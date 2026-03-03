package com.example.demo.dtos;

import java.math.BigDecimal;

public record CartItemResponseDTO(ProductResponseDTO product,
                                  Integer quantity,
                                  BigDecimal subtotal) {
}
