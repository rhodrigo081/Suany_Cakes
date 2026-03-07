package com.example.demo.dtos;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record OrderRequestDTO(@NotNull
        UUID addressId, LocalDate deliveryDate) {

}
