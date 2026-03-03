package com.example.demo.dtos;

import java.time.LocalDate;
import java.util.List;

public record UserResponseDTO(
                              String firstName,
                              String lastName,
                              String email,
                              LocalDate createdAt,
                              String phone, List<ProductResponseDTO> favorites) {
}
