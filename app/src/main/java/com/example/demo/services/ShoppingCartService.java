package com.example.demo.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.CartItemResponseDTO;
import com.example.demo.dtos.ProductResponseDTO;
import com.example.demo.dtos.ShoppingCartResponseDTO;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.CartItemModel;
import com.example.demo.models.ProductModel;
import com.example.demo.models.ShoppingCartModel;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.ShoppingCartRepository;

@Service
public class ShoppingCartService {

    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public ShoppingCartModel getOrCreateCart(UserModel user) {
        return shoppingCartRepository.findByUser(user)
                .orElseGet(() -> shoppingCartRepository.save(
                new ShoppingCartModel(null, user, new ArrayList<>(), BigDecimal.ZERO)
        ));
    }

    @Transactional(readOnly = true)
    public ShoppingCartResponseDTO getCart(UserModel user) {
        ShoppingCartModel cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        return convertToResponseDTO(cart);
    }

    @Transactional
    public void clearCart(UserModel user) {
        ShoppingCartModel cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        shoppingCartRepository.save(cart);
    }

    public void updateTotal(ShoppingCartModel cart) {
        BigDecimal total = cart.getItems().stream()
                .map(CartItemModel::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalPrice(total);
    }

    public ShoppingCartResponseDTO convertToResponseDTO(ShoppingCartModel cart) {
        List<CartItemResponseDTO> items = cart.getItems().stream()
                .map(item -> {
                    ProductModel product = item.getProduct();
                    ProductResponseDTO productDTO = new ProductResponseDTO(
                            product.getName(),
                            product.getDescription(),
                            product.getPrice(),
                            product.getImage(),
                            product.getCategory(),
                            product.isFeatured(),
                            product.getIngredients()
                    );
                    return new CartItemResponseDTO(productDTO, item.getQuantity(), item.getSubtotal());
                })
                .toList();

        return new ShoppingCartResponseDTO(items, cart.getTotalPrice());
    }
}
