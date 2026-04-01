package com.example.demo.repositories;

import com.example.demo.enums.ProductCategory;
import com.example.demo.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, UUID> {

    Optional<ProductModel> findByName(String name);

    List<ProductModel> findByFeaturedTrue();

    List<ProductModel> findByCategory(ProductCategory category);

    List<ProductModel> findTop4ByFeaturedTrue();

    Long countBy();

    List<ProductModel> findProductModelByIsActive(Boolean isActive);
}
