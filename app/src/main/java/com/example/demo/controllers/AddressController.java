package com.example.demo.controllers;

import com.example.demo.dtos.request.AddressRequestDTO;
import com.example.demo.dtos.response.AddressResponseDTO;
import com.example.demo.services.AddressService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;

import com.example.demo.models.User;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressResponseDTO> create(Authentication authentication,
                                                     @RequestBody @Valid AddressRequestDTO dto) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(addressService.create(user, dto));
    }

    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> findAll(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(addressService.findByUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> update(Authentication authentication,
            @PathVariable UUID id,
            @RequestBody @Valid AddressRequestDTO dto) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(addressService.update(user, id, dto));
    }

    @PatchMapping("/{id}/primary")
    public ResponseEntity<AddressResponseDTO> setPrimary(Authentication authentication,
            @PathVariable UUID id) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(addressService.setPrimary(user, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication authentication,
            @PathVariable UUID id) {
        User user = (User) authentication.getPrincipal();
        addressService.delete(user, id);
        return ResponseEntity.noContent().build();
    }
}
