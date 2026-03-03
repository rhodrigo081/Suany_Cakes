package com.example.demo.repositories;

import com.example.demo.dtos.OrderResponseDTO;
import com.example.demo.models.OrderModel;
import com.example.demo.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface OrderRepository extends JpaRepository<OrderModel, UUID> {

    List<OrderModel> findByUserOrderByCreatedAtDesc(UserModel user);

}
