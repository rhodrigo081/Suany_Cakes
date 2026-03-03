package com.example.demo.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public record AddressResponseDTO(@NotBlank
        UUID id, @NotBlank
        String label,
        @NotBlank
        String street,
        @NotBlank
        String city,
        @NotBlank
        String state,
        @NotBlank
        String zipCode,
        String neighborhood,
        Long number,
        String complement,
        Boolean isPrimary) {

}
