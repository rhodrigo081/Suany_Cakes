package com.example.demo.dtos;

import jakarta.validation.constraints.NotNull;

public record UpdateQuantityRequestDTO(@NotNull Integer quantity) {}