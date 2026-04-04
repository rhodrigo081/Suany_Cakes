package com.example.demo.dtos;

public record DashboardStatusResponseDTO(
    List<OrderStatusCountDTO> statusList, 
    Double cancellationRate
) {}