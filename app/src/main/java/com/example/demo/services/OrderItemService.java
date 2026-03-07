package com.example.demo.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dtos.OrderItemResponseDTO;
import com.example.demo.models.CartItemModel;
import com.example.demo.models.OrderItemModel;
import com.example.demo.models.OrderModel;

@Service
public class OrderItemService {

    public List<OrderItemModel> convertFromCart(List<CartItemModel> cartItems, OrderModel order) {
        return cartItems.stream()
                .map(cartItem -> {
                    OrderItemModel orderItem = new OrderItemModel();
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setSubtotal(
                            cartItem.getProduct().getPrice()
                                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()))
                    );
                    orderItem.setOrder(order);
                    return orderItem;
                })
                .toList();
    }

    public OrderItemResponseDTO toResponseDTO(OrderItemModel item) {
        return new OrderItemResponseDTO(
                item.getProduct().getName(),
                item.getProduct().getImage(),
                item.getQuantity(),
                item.getProduct().getPrice(),
                item.getSubtotal()
        );
    }
}
