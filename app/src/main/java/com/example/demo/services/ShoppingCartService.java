package com.example.demo.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.CartItemResponseDTO;
import com.example.demo.dtos.ShoppingCartResponseDTO;
import com.example.demo.exception.NotFoundException;
import com.example.demo.mappers.CartItemMapper;
import com.example.demo.models.CartItemModel;
import com.example.demo.models.ShoppingCartModel;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.ShoppingCartRepository;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CartItemMapper cartItemMapper;

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
        List<CartItemResponseDTO> itemDTOs = cart.getItems().stream()
                .map(cartItemMapper::toResponseDTO)
                .toList();

        return new ShoppingCartResponseDTO(itemDTOs, cart.getTotalPrice());
    }
}
