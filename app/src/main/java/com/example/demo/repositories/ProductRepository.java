package com.example.demo.repositories;

import com.example.demo.enums.ProductCategory;
import com.example.demo.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findByName(String name);

    List<Product> findByFeaturedTrue();

    List<Product> findByCategory(ProductCategory category);

    List<Product> findTop4ByFeaturedTrue();

    List<Product> findAllByNameIn(List<String> names);

    Long countBy();

    List<Product> findByIsActive(Boolean isActive);
}
