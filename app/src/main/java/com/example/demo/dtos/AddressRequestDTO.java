package com.example.demo.dtos;

import jakarta.validation.constraints.NotBlank;

public record AddressRequestDTO(@NotBlank
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
