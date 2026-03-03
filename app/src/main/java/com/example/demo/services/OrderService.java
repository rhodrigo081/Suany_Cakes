package com.example.demo.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.dtos.AddressResponseDTO;
import com.example.demo.dtos.OrderItemResponseDTO;
import com.example.demo.dtos.OrderRequestDTO;
import com.example.demo.dtos.OrderResponseDTO;
import com.example.demo.enums.OrderStatus;
import com.example.demo.exception.InvalidArgumentException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.models.AddressModel;
import com.example.demo.models.OrderModel;
import com.example.demo.models.ShoppingCartModel;
import com.example.demo.models.UserModel;
import com.example.demo.repositories.AddressRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.ShoppingCartRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ShoppingCartRepository shopingCartRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderItemService orderItemService;

    @Transactional
    public OrderResponseDTO createOrder(UserModel user, OrderRequestDTO request) {
        ShoppingCartModel cart = shopingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado"));

        if (cart.getItems().isEmpty()) {
            throw new InvalidArgumentException("O carrinho está vazio");
        }

        AddressModel address = addressRepository.findById(request.addressId())
                .orElseThrow(() -> new InvalidArgumentException("Endereço inválido"));

        if (request.deliveryDate() != null && request.deliveryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidArgumentException("A data de entrega não pode ser no passado.");
        }

        OrderModel order = new OrderModel();
        order.setUser(user);
        order.setShippingAddress(address);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setTotalPrice(cart.getTotalPrice());
        order.setDeliveryDate(request.deliveryDate() != null
                ? request.deliveryDate()
                : LocalDateTime.now().plusDays(7));

        order.setItems(orderItemService.convertFromCart(cart.getItems(), order));

        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        shopingCartRepository.save(cart);

        return convertToResponseDTO(orderRepository.save(order));
    }

    public List<OrderResponseDTO> getOrdersByUser(UserModel user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    private OrderResponseDTO convertToResponseDTO(OrderModel model) {
        List<OrderItemResponseDTO> items = model.getItems().stream()
                .map(item -> new OrderItemResponseDTO(
                item.getProduct().getName(),
                item.getProduct().getImage(),
                item.getQuantity(),
                item.getProduct().getPrice()
        ))
                .collect(Collectors.toList());

        AddressResponseDTO addressDTO = new AddressResponseDTO(
                model.getShippingAddress().getId(),
                model.getShippingAddress().getLabel(),
                model.getShippingAddress().getStreet(),
                model.getShippingAddress().getCity(),
                model.getShippingAddress().getState(),
                model.getShippingAddress().getZipCode(),
                model.getShippingAddress().getNeighborhood(),
                model.getShippingAddress().getNumber(),
                model.getShippingAddress().getComplement(),
                model.getShippingAddress().getIsPrimary()
        );

        return new OrderResponseDTO(
                model.getId(),
                model.getOrderStatus().name(),
                model.getCreatedAt(),
                model.getTotalPrice(),
                addressDTO,
                items
        );
    }
}
