package com.example.demo.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.AddressRequestDTO;
import com.example.demo.dtos.AddressResponseDTO;
import com.example.demo.exception.NotFoundException;
import com.example.demo.exception.UnauthorizedAccessException;
import com.example.demo.models.AddressModel;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Transactional
    public AddressResponseDTO create(UserModel user, AddressRequestDTO dto) {
        AddressModel address = new AddressModel();
        BeanUtils.copyProperties(dto, address);
        address.setUser(user);

        AddressModel saved = addressRepository.save(address);

        if (Boolean.TRUE.equals(saved.getIsPrimary())) {
            addressRepository.clearPrimaryAddresses(user.getId(), saved.getId());
        }

        return convertToResponse(saved);
    }

    public List<AddressResponseDTO> findByUser(UserModel user) {
        return addressRepository.findByUser(user).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public AddressResponseDTO update(UserModel user, UUID id, AddressRequestDTO dto) {
        AddressModel address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Endereço não encontrado"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Endereço não pertence ao usuário.");
        }

        BeanUtils.copyProperties(dto, address, "id", "user");
        AddressModel saved = addressRepository.save(address);

        if (Boolean.TRUE.equals(saved.getIsPrimary())) {
            addressRepository.clearPrimaryAddresses(user.getId(), saved.getId());
        }

        return convertToResponse(saved);
    }

    @Transactional
    public AddressResponseDTO setPrimary(UserModel user, UUID id) {
        AddressModel address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Endereço não encontrado"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Endereço não pertence ao usuário.");
        }

        addressRepository.clearPrimaryAddresses(user.getId(), id);
        address.setIsPrimary(true);

        return convertToResponse(addressRepository.save(address));
    }

    @Transactional
    public void delete(UserModel user, UUID id) {
        AddressModel address = addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Endereço não encontrado"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedAccessException("Endereço não pertence ao usuário.");
        }

        addressRepository.deleteById(id);
    }

    public AddressResponseDTO convertToResponse(AddressModel address) {
        return new AddressResponseDTO(
                address.getId(),
                address.getLabel(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getNeighborhood(),
                address.getNumber(),
                address.getComplement(),
                address.getIsPrimary()
        );
    }

}
