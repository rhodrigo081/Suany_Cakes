package com.example.demo.mappers;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.CartItemResponseDTO;
import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.models.CartItemModel;
import com.example.demo.models.ProductModel;

@Component
public class CartItemMapper {

    public CartItemResponseDTO toResponseDTO(CartItemModel item) {
        ProductModel product = item.getProduct();

        ProductResponseDTO productDTO = new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getCategory(),
                product.isFeatured(),
                product.getIngredients()
        );

        return new CartItemResponseDTO(productDTO, item.getQuantity(), item.getSubtotal());
    }
}
