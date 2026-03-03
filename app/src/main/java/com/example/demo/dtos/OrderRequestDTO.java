package com.example.demo.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record OrderRequestDTO(@NotNull UUID addressId, LocalDateTime deliveryDate) {
}
