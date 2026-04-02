package com.example.demo.mappers;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.CartItemResponseDTO;
import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.models.CartItem;
import com.example.demo.models.Product;

@Component
public class CartItemMapper {

    public CartItemResponseDTO toResponseDTO(CartItem item) {
        Product product = item.getProduct();

        ProductResponseDTO productDTO = new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getCategory(),
                product.getFeatured(),
                product.getIngredients(),
                product.getIsActive()
        );

        return new CartItemResponseDTO(productDTO, item.getQuantity(), item.getSubtotal());
    }
}
