package com.example.demo.dtos;

import java.util.List;

public record DashboardStatusResponseDTO(
    List<OrderStatusCountDTO> statusList, 
    Double cancellationRate
) {}