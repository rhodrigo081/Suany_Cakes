package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Address;
import com.example.demo.models.User;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findByUser(User user);

    @Modifying
    @Query("UPDATE Address a SET a.isPrimary = false WHERE a.user.id = :userId AND a.id <> :exceptId")
    void clearPrimaryAddresses(@Param("userId") UUID userId, @Param("exceptId") UUID exceptId);

    Optional<Address> findByIdAndUser(UUID id, User user);

}
