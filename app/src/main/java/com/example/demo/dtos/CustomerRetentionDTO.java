package com.example.demo.dtos;

public record CustomerRetentionDTO(
        Long totalCustomers,
        Long recurringCustomers,
        Long newCustomersThisMonth,
        Integer retentionPercentage
) {
}