package com.example.demo.dtos.response;

import java.util.List;

public record DashboardStatusResponseDTO(
    List<OrderStatusCountDTO> statusList, 
    Double cancellationRate
) {}