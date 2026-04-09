package com.example.demo.dtos.response;

public record PaymentResponseDTO(
        String paymentId,
        String status,
        String statusDetail
) {}
