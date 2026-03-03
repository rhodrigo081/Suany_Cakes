package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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
                    orderItem.setOrder(order);
                    return orderItem;
                })
                .collect(Collectors.toList());
    }
}
