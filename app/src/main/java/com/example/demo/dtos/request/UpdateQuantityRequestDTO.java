package com.example.demo.dtos.request;

import jakarta.validation.constraints.NotNull;

public record UpdateQuantityRequestDTO(@NotNull Integer quantity) {}