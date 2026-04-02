package com.example.demo.repositories;

import com.example.demo.models.CartItem;
import com.example.demo.models.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.product = :product")
    void deleteByProduct(Product product);
}
