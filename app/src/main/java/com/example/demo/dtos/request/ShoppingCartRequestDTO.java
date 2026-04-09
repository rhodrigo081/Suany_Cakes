package com.example.demo.dtos.request;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record ShoppingCartRequestDTO(@NotNull
        UUID userId,
        @NotNull
        List<CartItemRequestDTO> items) {

}
