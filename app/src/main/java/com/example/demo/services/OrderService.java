package com.example.demo.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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
    private ShoppingCartRepository shoppingCartRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private OrderItemService orderItemService;

    @Transactional
    public OrderResponseDTO createOrder(UserModel user, OrderRequestDTO request) {
        ShoppingCartModel cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new NotFoundException("Carrinho não encontrado"));

        if (cart.getItems().isEmpty()) {
            throw new InvalidArgumentException("O carrinho está vazio");
        }

        AddressModel address = addressRepository.findByIdAndUser(request.addressId(), user)
                .orElseThrow(() -> new InvalidArgumentException("Endereço inválido"));

        if (request.deliveryDate() != null && request.deliveryDate().isBefore(LocalDate.now())) {
            throw new InvalidArgumentException("A data de entrega não pode ser no passado.");
        }

        OrderModel order = new OrderModel();
        order.setUser(user);
        order.setShippingAddress(address);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setTotalPrice(cart.getTotalPrice());
        order.setDeliveryDate(request.deliveryDate() != null
                ? request.deliveryDate()
                : LocalDate.now().plusDays(7));

        order.setItems(orderItemService.convertFromCart(cart.getItems(), order));

        cart.getItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        shoppingCartRepository.save(cart);

        return convertToResponseDTO(orderRepository.save(order));
    }

    public List<OrderResponseDTO> getOrdersByUser(UserModel user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public Long getAllOrdersQuantity(){
        return orderRepository.countBy();
    }

    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus newStatus) {
        OrderModel order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado"));
        if (order.getOrderStatus() == OrderStatus.FINISHED || order.getOrderStatus() == OrderStatus.CANCELED) {
            throw new InvalidArgumentException("Não é possível alterar um pedido já finalizado ou cancelado.");
        }

        order.setOrderStatus(newStatus);

        return convertToResponseDTO(orderRepository.save(order));
    }

    private OrderResponseDTO convertToResponseDTO(OrderModel model) {
        List<OrderItemResponseDTO> items = model.getItems().stream()
                .map(orderItemService::toResponseDTO)
                .toList();

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

        String customerName = model.getUser().getFirstName() + " " + model.getUser().getLastName();

        return new OrderResponseDTO(
                model.getId(),
                customerName,
                model.getOrderStatus().name(),
                model.getCreatedAt(),
                model.getDeliveryDate(),
                model.getTotalPrice(),
                addressDTO,
                items
        );
    }
}
