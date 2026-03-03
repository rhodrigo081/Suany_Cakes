package com.example.demo.dtos;

import java.math.BigDecimal;

public record OrderItemResponseDTO(String productName,
        String productImagem,
        Integer quantity,
        BigDecimal unitPrice) {

}
