package com.example.demo.controllers;

import java.util.List;
import java.util.UUID;

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

import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.dtos.UpdateUserRequestDTO;
import com.example.demo.dtos.UserResponseDTO;
import com.example.demo.models.User;
import com.example.demo.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/update")
    public ResponseEntity<UserResponseDTO> update(Authentication authentication, @RequestBody @Valid UpdateUserRequestDTO dto) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userService.updateUser(user.getEmail(), dto));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<UserResponseDTO> delete(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userService.deleteUser(user.getEmail()));
    }

    @PostMapping("/favorites/{productId}")
    public ResponseEntity<Void> toggleFavorite(@PathVariable UUID productId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        userService.toggleFavorite(user.getId(), productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<ProductResponseDTO>> getFavorites(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(userService.getFavorites(user.getId()));
    }
}
