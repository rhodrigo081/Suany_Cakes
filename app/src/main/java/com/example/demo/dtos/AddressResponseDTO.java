package com.example.demo.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressResponseDTO(
        @NotBlank UUID id,
        @NotBlank String label,
        @NotBlank String street,
        @NotBlank String city,
        @NotBlank String state,
        @NotBlank String zipCode,
        @NotBlank String neighborhood,
        @NotNull Long number,
        String complement,
        Boolean isPrimary) {

}
