package com.example.demo.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.demo.dtos.request.ProductRequestDTO;
import com.example.demo.dtos.response.ProductRankingDTO;
import com.example.demo.dtos.response.ProductResponseDTO;
import com.example.demo.repositories.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.enums.OrderStatus;
import com.example.demo.enums.ProductCategory;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.Product;
import com.example.demo.repositories.OrderItemRepository;
import com.example.demo.repositories.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO data) {
        if (productRepository.findByName(data.name()).isPresent()) {
            throw new InvalidArgumentException("Já existe um produto cadastrado com este nome.");
        }

        Product newProduct = new Product();
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
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Produto não encontrado"));
        return convertToResponseDTO(product);
    }

    public List<ProductResponseDTO> findByCategory(String categorySlug) {
        try {
            ProductCategory categoryEnum = ProductCategory.valueOf(categorySlug.toUpperCase());
            return productRepository.findByCategory(categoryEnum).stream().map(this::convertToResponseDTO).collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new InvalidArgumentException("Categoria inválida: " + categorySlug);
        }
    }

    public List<ProductResponseDTO> findFeatured() {
        return productRepository.findTop4ByFeaturedTrue().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }

    @Transactional
    public void updateAllProductsPopularity() {
        List<Product> allFeatured = productRepository.findByFeaturedTrue();
        allFeatured.forEach(p -> p.setFeatured(false));
        productRepository.saveAll(allFeatured);

        Pageable topFour = PageRequest.of(0, 4);
        List<ProductRankingDTO> topSellingData = orderItemRepository.findTopSellingProducts(OrderStatus.FINISHED, topFour);

        List<String> names = topSellingData.stream().map(ProductRankingDTO::name).toList();
        List<Product> topProducts = productRepository.findAllByNameIn(names);

        topProducts.forEach(p -> p.setFeatured(true));
        productRepository.saveAll(topProducts);
    }

    public List<ProductRankingDTO> getTopSelling() {
        return orderItemRepository.findTopSellingProducts(
                OrderStatus.FINISHED,
                PageRequest.of(0, 4)
        );
    }

    public List<ProductRankingDTO> getLowSelling() {

        List<ProductRankingDTO> topSelling = getTopSelling();
        List<String> topNames = topSelling.stream()
                .map(ProductRankingDTO::name)
                .toList();

        if (topNames.isEmpty()) {
            topNames = List.of("");
        }


        return orderItemRepository.findLowSellingProductsExcluding(
                OrderStatus.FINISHED,
                topNames,
                PageRequest.of(0, 4)
        );
    }

    @Transactional
    public void delete(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto não encontrado"));

        cartItemRepository.deleteByProduct(product);

        orderItemRepository.nullifyProductId(product.getId());

        productRepository.delete(product);
    }

    public Long getAllProductsQuantity() {
        return productRepository.countBy();
    }

    @Transactional
    public ProductResponseDTO update(UUID id, ProductRequestDTO data) {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Produto não encontrado"));

        productRepository.findByName(data.name()).ifPresent(existingProduct -> {
            if (!existingProduct.getId().equals(id)) {
                throw new InvalidArgumentException("Já existe outro produto cadastrado com este nome.");
            }
        });

        product.setName(data.name());
        product.setDescription(data.description());
        product.setPrice(data.price());
        product.setImage(data.image());
        product.setIsActive(data.isActive());
        product.setFeatured(data.featured());
        product.setIngredients(data.ingredients());

        try {
            product.setCategory(ProductCategory.valueOf(data.category().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new InvalidArgumentException("Categoria inválida: " + data.category());
        }

        return convertToResponseDTO(productRepository.save(product));
    }

    public List<ProductResponseDTO> findByActiveStatus(Boolean isActive) {
        return productRepository.findByIsActive(isActive).stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }


    public ProductResponseDTO convertToResponseDTO(Product model) {
        return new ProductResponseDTO(model.getId(), model.getName(), model.getDescription(), model.getPrice(), model.getImage(), model.getCategory(), model.getFeatured(), model.getIngredients(), model.getIsActive());
    }

}
