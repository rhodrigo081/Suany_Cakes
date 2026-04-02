package com.example.demo.services;

import java.math.BigDecimal;
import java.util.List;

import com.example.demo.models.Product;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.OrderItemResponseDTO;
import com.example.demo.models.CartItem;
import com.example.demo.models.OrderItem;
import com.example.demo.models.Order;

@Service
public class OrderItemService {

    public List<OrderItem> convertFromCart(List<CartItem> cartItems, Order order) {
        return cartItems.stream()
                .map(cartItem -> {
                    Product product = cartItem.getProduct();

                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProduct(product);

                    orderItem.setProductName(product.getName());
                    orderItem.setProductImage(product.getImage());
                    orderItem.setProductPrice(product.getPrice());

                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

                    return orderItem;
                })
                .toList();
    }

    public OrderItemResponseDTO toResponseDTO(OrderItem item) {

        return new OrderItemResponseDTO(
                item.getProductName(),
                item.getProductImage(),
                item.getQuantity(),
                item.getProductPrice(),
                item.getSubtotal()
        );
    }
}
