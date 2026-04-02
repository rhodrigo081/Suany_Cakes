package com.example.demo.services;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.CartItemRequestDTO;
import com.example.demo.dtos.ShoppingCartResponseDTO;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.CartItem;
import com.example.demo.models.Product;
import com.example.demo.models.ShoppingCart;
import com.example.demo.models.User;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.ShoppingCartRepository;

@Service
public class CartItemService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Transactional
    public ShoppingCartResponseDTO addItem(User user, CartItemRequestDTO request) {
        ShoppingCart cart = shoppingCartService.getOrCreateCart(user);

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new NotFoundException("Produto não encontrado."));

        cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.productId()))
                .findFirst()
                .ifPresentOrElse(
                        item -> {
                            item.setQuantity(item.getQuantity() + request.quantity());
                            item.setSubtotal(item.getProduct().getPrice()
                                    .multiply(BigDecimal.valueOf(item.getQuantity())));
                        },
                        () -> cart.getItems().add(new CartItem(product, request.quantity(), cart))
                );

        shoppingCartService.updateTotal(cart);
        return shoppingCartService.convertToResponseDTO(shoppingCartRepository.save(cart));
    }

    @Transactional
    public ShoppingCartResponseDTO updateItemQuantity(User user, UUID productId, Integer quantity) {
        if (quantity <= 0) {
            throw new InvalidArgumentException("A quantidade deve ser maior que zero.");
        }

        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Item não encontrado no carrinho."));

        item.setQuantity(quantity);
        item.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(quantity)));

        shoppingCartService.updateTotal(cart);
        return shoppingCartService.convertToResponseDTO(shoppingCartRepository.save(cart));
    }

    @Transactional
    public ShoppingCartResponseDTO removeItem(User user, UUID productId) {
        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado."));

        boolean removed = cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));

        if (!removed) {
            throw new NotFoundException("Item não encontrado no carrinho.");
        }

        shoppingCartService.updateTotal(cart);
        return shoppingCartService.convertToResponseDTO(shoppingCartRepository.save(cart));
    }
}
