package com.example.demo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CartItemResponseDTO(@NotBlank ProductResponseDTO product,
                                  @NotNull Integer quantity,
                                  @NotNull BigDecimal subtotal) {
}
