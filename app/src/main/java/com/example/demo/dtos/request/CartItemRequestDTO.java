package com.example.demo.dtos.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record CartItemRequestDTO(@NotNull UUID productId, @NotNull Integer quantity) {

}
