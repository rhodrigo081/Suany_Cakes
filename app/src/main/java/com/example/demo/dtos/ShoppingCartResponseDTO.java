package com.example.demo.dtos;

import java.math.BigDecimal;
import java.util.List;

public record ShoppingCartResponseDTO(List<CartItemResponseDTO> items,
                                      BigDecimal totalPrice) {
}
