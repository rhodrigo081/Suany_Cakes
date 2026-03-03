package com.example.demo.repositories;

import com.example.demo.models.ShoppingCartModel;
import com.example.demo.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCartModel, UUID> {

    Optional<ShoppingCartModel> findByUser(UserModel user);

}
