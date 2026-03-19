package com.example.demo.dtos;

import java.math.BigDecimal;

import com.example.demo.enums.ProductCategory;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategorySalesDTO {
    private ProductCategory category;
    private BigDecimal value;
    private Double percentage;

    public CategorySalesDTO(ProductCategory category, BigDecimal value) {
        this.category = category;
        this.value = value;
        this.percentage = 0.0; 
    }
}