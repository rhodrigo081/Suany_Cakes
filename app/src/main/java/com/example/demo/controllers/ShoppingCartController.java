package com.example.demo.controllers;

import com.example.demo.dtos.CartItemRequestDTO;
import com.example.demo.dtos.ShoppingCartResponseDTO;
import com.example.demo.models.UserModel;
import com.example.demo.services.ShoppingCartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import com.example.demo.services.CartItemService;

import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/items")
    public ResponseEntity<ShoppingCartResponseDTO> addItem(Authentication authentication,
            @RequestBody CartItemRequestDTO request) {
        UserModel user = (UserModel) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.addItem(user, request));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<ShoppingCartResponseDTO> updateItem(Authentication authentication,
            @PathVariable UUID productId,
            @RequestBody @NotNull Integer quantity) {
        UserModel user = (UserModel) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.updateItemQuantity(user, productId, quantity));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ShoppingCartResponseDTO> removeItem(Authentication authentication,
            @PathVariable UUID productId) {
        UserModel user = (UserModel) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.removeItem(user, productId));
    }

    @GetMapping
    public ResponseEntity<ShoppingCartResponseDTO> getCart(Authentication authentication) {
        UserModel user = (UserModel) authentication.getPrincipal();
        return ResponseEntity.ok(shoppingCartService.getCart(user));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        UserModel user = (UserModel) authentication.getPrincipal();
        shoppingCartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }
}
