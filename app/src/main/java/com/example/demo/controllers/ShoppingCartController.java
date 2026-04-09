package com.example.demo.controllers;

import java.util.UUID;

import com.example.demo.dtos.request.CartItemRequestDTO;
import com.example.demo.dtos.request.UpdateQuantityRequestDTO;
import com.example.demo.dtos.response.ShoppingCartResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.services.CartItemService;
import com.example.demo.services.ShoppingCartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/items")
    public ResponseEntity<ShoppingCartResponseDTO> addItem(Authentication authentication,
                                                           @RequestBody @Valid CartItemRequestDTO request) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.addItem(user, request));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<ShoppingCartResponseDTO> updateItem(Authentication authentication,
            @PathVariable UUID productId,
            @RequestBody @Valid UpdateQuantityRequestDTO request) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.updateItemQuantity(user, productId, request.quantity()));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ShoppingCartResponseDTO> removeItem(Authentication authentication,
            @PathVariable UUID productId) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(cartItemService.removeItem(user, productId));
    }

    @GetMapping
    public ResponseEntity<ShoppingCartResponseDTO> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(shoppingCartService.getCart(user));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        shoppingCartService.clearCart(user);
        return ResponseEntity.noContent().build();
    }
}
