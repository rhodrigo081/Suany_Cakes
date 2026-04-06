package com.example.demo.repositories;

import com.example.demo.enums.UserRole;
import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    long countByRoleAndCreatedAtAfter(UserRole role, LocalDate date);
    long countByRole(UserRole role);
}

