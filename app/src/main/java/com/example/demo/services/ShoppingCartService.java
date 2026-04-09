package com.example.demo.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.dtos.response.CartItemResponseDTO;
import com.example.demo.dtos.response.ShoppingCartResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.exception.NotFoundException;
import com.example.demo.mappers.CartItemMapper;
import com.example.demo.models.CartItem;
import com.example.demo.models.ShoppingCart;
import com.example.demo.models.User;
import com.example.demo.repositories.ShoppingCartRepository;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Transactional
    public ShoppingCart getOrCreateCart(User user) {
        return shoppingCartRepository.findByUser(user)
                .orElseGet(() -> shoppingCartRepository.save(
                new ShoppingCart(null, user, new ArrayList<>(), BigDecimal.ZERO)
        ));
    }

    @Transactional(readOnly = true)
    public ShoppingCartResponseDTO getCart(User user) {
        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        return convertToResponseDTO(cart);
    }

    @Transactional
    public void clearCart(User user) {
        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        shoppingCartRepository.save(cart);
    }

    public void updateTotal(ShoppingCart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalPrice(total);
    }

    public ShoppingCartResponseDTO convertToResponseDTO(ShoppingCart cart) {
        List<CartItemResponseDTO> itemDTOs = cart.getItems().stream()
                .map(cartItemMapper::toResponseDTO)
                .toList();

        return new ShoppingCartResponseDTO(itemDTOs, cart.getTotalPrice());
    }
}
