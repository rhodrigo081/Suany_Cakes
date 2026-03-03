package com.example.demo.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.OrderRequestDTO;
import com.example.demo.dtos.OrderResponseDTO;
import com.example.demo.models.UserModel;
import com.example.demo.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> checkout(Authentication authentication, @RequestBody OrderRequestDTO request) {
        UserModel user = (UserModel) authentication.getPrincipal();

        return ResponseEntity.ok(orderService.createOrder(user, request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<OrderResponseDTO>> getOrderHistory(Authentication authentication) {
        UserModel user = (UserModel) authentication.getPrincipal();

        List<OrderResponseDTO> history = orderService.getOrdersByUser(user);
        return ResponseEntity.ok(history);
    }
}
