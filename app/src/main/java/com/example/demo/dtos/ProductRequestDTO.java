package com.example.demo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Set;

public record ProductRequestDTO(@NotBlank String name,
                                @NotBlank String description,
                                @NotNull BigDecimal price,
                                String image,
                                @NotBlank String category,
                                boolean featured,
                                Set<String> ingredients) {
}
