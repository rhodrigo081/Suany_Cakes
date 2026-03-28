package com.example.demo.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.demo.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.ProductRequestDTO;
import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.enums.OrderStatus;
import com.example.demo.enums.ProductCategory;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.ProductModel;
import com.example.demo.repositories.OrderItemRepository;
import com.example.demo.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO data) {
        if (productRepository.findByName(data.name()).isPresent()) {
            throw new InvalidArgumentException("Já existe um produto cadastrado com este nome.");
        }

        ProductModel newProduct = new ProductModel();
        newProduct.setName(data.name());
        newProduct.setDescription(data.description());
        newProduct.setPrice(data.price());
        newProduct.setImage(data.image());
        newProduct.setIsActive(data.isActive());

        try {
            newProduct.setCategory(ProductCategory.valueOf(data.category().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new InvalidArgumentException("Categoria inválida: " + data.category());
        }

        newProduct.setFeatured(data.featured());
        newProduct.setIngredients(data.ingredients());

        return convertToResponseDTO(productRepository.save(newProduct));
    }

    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }

    public ProductResponseDTO findById(UUID id) {
        ProductModel product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Produto não encontrado"));
        return convertToResponseDTO(product);
    }

    public List<ProductResponseDTO> findByCategory(String categorySlug) {
        try {
            ProductCategory categoryEnum = ProductCategory.valueOf(categorySlug.toUpperCase());
            return productRepository.findByCategory(categoryEnum).stream()
                    .map(this::convertToResponseDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new InvalidArgumentException("Categoria inválida: " + categorySlug);
        }
    }

    public List<ProductResponseDTO> findFeatured() {
        return productRepository.findTop4ByFeaturedTrue().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateAllProductsPopularity() {

        List<ProductModel> allFeatured = productRepository.findByFeaturedTrue();
        allFeatured.forEach(p -> p.setFeatured(false));
        productRepository.saveAll(allFeatured);

        Pageable topFour = PageRequest.of(0, 4);
        List<UUID> topProductIds = orderItemRepository.findTopSellingProductIds(OrderStatus.FINISHED, topFour);

        List<ProductModel> topProducts = productRepository.findAllById(topProductIds);
        topProducts.forEach(p -> p.setFeatured(true));
        productRepository.saveAll(topProducts);
    }

    @Transactional
    public ProductResponseDTO toggleFeatured(UUID id) {
        ProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto não encontrado"));

        product.setFeatured(!product.getFeatured());
        return convertToResponseDTO(productRepository.save(product));
    }

    @Transactional
    public void delete(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new NotFoundException("Produto não encontrado");
        }

        productRepository.deleteById(id);
    }

    public Long getAllProductsQuantity() {
        return productRepository.countBy();
    }


    public ProductResponseDTO convertToResponseDTO(ProductModel model) {
        return new ProductResponseDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getPrice(),
                model.getImage(),
                model.getCategory(),
                model.getFeatured(),
                model.getIngredients(),
                model.getIsActive()
        );
    }

}
