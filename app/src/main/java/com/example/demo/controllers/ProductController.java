package com.example.demo.controllers;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.request.ProductRequestDTO;
import com.example.demo.dtos.response.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody @Valid ProductRequestDTO data) {
        return ResponseEntity.ok(productService.create(data));
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<List<ProductResponseDTO>> getByCategory(@PathVariable String slug) {
        return ResponseEntity.ok(productService.findByCategory(slug));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProductResponseDTO>> getFeatured() {
        return ResponseEntity.ok(productService.findFeatured());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable UUID id,
            @RequestBody @Valid ProductRequestDTO data) {
        return ResponseEntity.ok(productService.update(id, data));
    }

    @GetMapping("/active")
    public ResponseEntity<List<ProductResponseDTO>> getActiveProducts() {
        return ResponseEntity.ok(productService.findByActiveStatus(true));
    }

}
