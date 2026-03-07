package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.AddressModel;
import com.example.demo.models.UserModel;

@Repository
public interface AddressRepository extends JpaRepository<AddressModel, UUID> {

    List<AddressModel> findByUser(UserModel user);

    @Modifying
    @Query("UPDATE AddressModel a SET a.isPrimary = false WHERE a.user.id = :userId AND a.id <> :exceptId")
    void clearPrimaryAddresses(@Param("userId") UUID userId, @Param("exceptId") UUID exceptId);

    Optional<AddressModel> findByIdAndUser(UUID id, UserModel user);

}
