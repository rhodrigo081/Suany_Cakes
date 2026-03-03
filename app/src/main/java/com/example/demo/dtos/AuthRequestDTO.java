package com.example.demo.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthRequestDTO(@NotBlank String email, @NotBlank String password) {
}
