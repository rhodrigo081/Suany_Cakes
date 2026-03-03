package com.example.demo.dtos;

import java.math.BigDecimal;
import java.util.Set;

import com.example.demo.enums.ProductCategory;

public record ProductResponseDTO(String name,
        String description,
        BigDecimal price,
        String image,
        ProductCategory category,
        boolean featured,
        Set<String> ingredients) {

}
