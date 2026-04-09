package com.example.demo.dtos.response;

public record CustomerRetentionDTO(
        Long totalCustomers,
        Long recurringCustomers,
        Long newCustomersThisMonth,
        Integer retentionPercentage
) {
}