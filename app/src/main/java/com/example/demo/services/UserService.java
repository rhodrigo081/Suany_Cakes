package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.dtos.UpdateUserRequestDTO;
import com.example.demo.dtos.UserResponseDTO;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.Product;
import com.example.demo.models.User;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    public UserResponseDTO convertToResponse(User user) {
        if (user == null) {
            return null;
        }

        List<ProductResponseDTO> favoriteDTOs = user.getFavorites().stream().map(productService::convertToResponseDTO).toList();

        return new UserResponseDTO(user.getFirstName(), user.getLastName(), user.getEmail(), user.getCreatedAt(), user.getPhone(), favoriteDTOs);
    }

    public List<ProductResponseDTO> getFavorites(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        return user.getFavorites().stream()
                .map(productService::convertToResponseDTO)
                .toList();
    }

    @Transactional
    public UserResponseDTO updateUser(String email, UpdateUserRequestDTO updateUserRequestDTO) {
        User userByEmail = userRepository.findByEmail(email).orElseThrow(() -> new InvalidArgumentException("User not found"));

        if (updateUserRequestDTO.email() != null && !updateUserRequestDTO.email().isEmpty()) {

            userRepository.findByEmail(updateUserRequestDTO.email()).ifPresent(foundCustomer -> {
                if (!foundCustomer.getEmail().equals(email)) {
                    throw new InvalidArgumentException("User email already exists");
                }
            });
            userByEmail.setEmail(updateUserRequestDTO.email());
        }

        if (updateUserRequestDTO.firstName() != null && !updateUserRequestDTO.firstName().isEmpty()) {
            userByEmail.setFirstName(updateUserRequestDTO.firstName());
        }

        if (updateUserRequestDTO.lastName() != null && !updateUserRequestDTO.lastName().isEmpty()) {
            userByEmail.setLastName(updateUserRequestDTO.lastName());
        }

        if (updateUserRequestDTO.phone() != null && !updateUserRequestDTO.phone().isEmpty()) {
            userRepository.findByPhone(updateUserRequestDTO.phone()).ifPresent(foundCustomer -> {
                if (!foundCustomer.getEmail().equals(email)) {
                    throw new InvalidArgumentException("User phone already exists");
                }
            });
            userByEmail.setPhone(updateUserRequestDTO.phone());
        }
        userRepository.save(userByEmail);

        return convertToResponse(userByEmail);
    }

    @Transactional
    public void toggleFavorite(UUID userId, UUID productId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Produto não encontrado"));

        if (user.getFavorites().contains(product)) {
            user.getFavorites().remove(product);
        } else {
            user.getFavorites().add(product);
        }

        userRepository.save(user);
    }

    @Transactional
    public UserResponseDTO deleteUser(String email) {
        User deletedUser = userRepository.findByEmail(email).orElseThrow(() -> new InvalidArgumentException("User not found"));

        userRepository.delete(deletedUser);

        return convertToResponse(deletedUser);
    }
}
