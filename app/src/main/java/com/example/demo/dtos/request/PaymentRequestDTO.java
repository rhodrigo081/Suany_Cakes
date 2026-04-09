package com.example.demo.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record PaymentRequestDTO(

        @NotBlank String transactionId,
        @NotBlank String paymentType,
        @NotBlank String paymentMethodId,

        @NotNull @Positive BigDecimal transactionAmount,

        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank String identificationType,
        @NotBlank String identificationNumber,

        String token,
        Integer installments

) {}