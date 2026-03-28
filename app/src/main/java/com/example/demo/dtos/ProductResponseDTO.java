package com.example.demo.dtos;

import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;

import com.example.demo.enums.ProductCategory;

public record ProductResponseDTO(UUID id, String name, String description, BigDecimal price, String image,
                                 ProductCategory category, Boolean featured, Set<String> ingredients,
                                 Boolean isActive) {

}
