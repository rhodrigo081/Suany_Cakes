package com.example.demo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequestDTO(@NotBlank String firstName, @NotBlank String lastName, @Email @NotBlank String email,
                                   String phone) {
}
