package com.example.demo.services;

import com.example.demo.dtos.request.PaymentRequestDTO;
import com.example.demo.dtos.response.PaymentResponseDTO;
import com.example.demo.enums.OrderStatus;

import com.example.demo.mappers.OrderMapper;
import com.mercadopago.client.order.*;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.core.MPRequestOptions;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.order.Order;
import com.mercadopago.resources.payment.Payment;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PaymentService {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderMapper orderMapper;

    public PaymentResponseDTO processPayment(PaymentRequestDTO dto, String userEmail) {
        validatePaymentRequest(dto);
        try {
            OrderPaymentMethodRequest paymentMethod = buildPaymentMethod(dto);

            OrderCreateRequest request = OrderCreateRequest.builder().type("online").processingMode("automatic").totalAmount(dto.transactionAmount().toString()).externalReference(dto.transactionId()).payer(OrderPayerRequest.builder().email(userEmail).build()).transactions(OrderTransactionRequest.builder().payments(List.of(OrderPaymentRequest.builder().amount(dto.transactionAmount().toString()).paymentMethod(paymentMethod).build())).build()).build();

            MPRequestOptions requestOptions = MPRequestOptions.builder().customHeaders(Map.of("X-Idempotency-Key", dto.transactionId())).build();

            Order order = new OrderClient().create(request, requestOptions);

            log.info("Order criada: {} | Tipo: {} | Status: {}", order.getId(), dto.paymentType(), order.getStatus());

            return new PaymentResponseDTO(order.getId(), order.getStatus(), order.getStatusDetail());

        } catch (MPApiException e) {
            log.error("Erro na API do Mercado Pago: {}", e.getApiResponse().getContent());
            throw new RuntimeException("Mercado Pago retornou erro: " + e.getApiResponse().getContent());
        } catch (MPException e) {
            log.error("Erro na SDK: {}", e.getMessage());
            throw new RuntimeException("Erro interno na SDK do Mercado Pago");
        }
    }

    private OrderPaymentMethodRequest buildPaymentMethod(PaymentRequestDTO dto) {
        return switch (dto.paymentType()) {

            case "credit_card" ->
                    OrderPaymentMethodRequest.builder().id(dto.paymentMethodId()).type("credit_card").token(dto.token()).installments(dto.installments()).build();

            case "debit_card" ->
                    OrderPaymentMethodRequest.builder().id(dto.paymentMethodId()).type("debit_card").token(dto.token()).installments(1).build();

            case "bank_transfer" -> OrderPaymentMethodRequest.builder().id("pix").type("bank_transfer").build();

            case "ticket" -> OrderPaymentMethodRequest.builder().id(dto.paymentMethodId()).type("ticket").build();

            default -> throw new IllegalArgumentException("Tipo de pagamento não suportado: " + dto.paymentType());
        };
    }

    private void validatePaymentRequest(PaymentRequestDTO dto) {
        switch (dto.paymentType()) {
            case "credit_card", "debit_card" -> {
                if (dto.token() == null || dto.token().isBlank()) {
                    throw new IllegalArgumentException("Token é obrigatório para pagamento com cartão");
                }
                if (dto.installments() == null || dto.installments() < 1) {
                    throw new IllegalArgumentException("Installments é obrigatório para pagamento com cartão");
                }
            }
            case "bank_transfer", "ticket" -> {
            }
            default -> throw new IllegalArgumentException("Tipo de pagamento inválido: " + dto.paymentType());
        }
    }

    @Transactional
    public void handleNotification(String id, String type) {
        try {
            String externalReference = null;
            String mpStatus = null;

            if ("payment".equals(type)) {
                Payment payment = new PaymentClient().get(Long.parseLong(id));
                externalReference = payment.getExternalReference();
                mpStatus = payment.getStatus();
                log.info("Processando notificação de PAGAMENTO. Status MP: {}", mpStatus);

            } else if ("merchant_order".equals(type) || "order".equals(type)) {
                Order order = new OrderClient().get(id);
                externalReference = order.getExternalReference();
                mpStatus = order.getStatus();
                log.info("Processando notificação de ORDER. Status MP: {}", mpStatus);
            }

            if (externalReference == null) {
                log.warn("Notificação para {} {} sem externalReference", type, id);
                return;
            }

            Long orderId = Long.parseLong(externalReference);
            OrderStatus newStatus = orderMapper.mapMpStatusToOrderStatus(mpStatus);
            orderService.updateOrderStatus(orderId, newStatus);

            log.info("Pedido Interno {} atualizado para status {}", orderId, newStatus);

        } catch (MPApiException e) {
            log.error("Erro na API do Mercado Pago ao processar {} {}: {}", type, id, e.getApiResponse().getContent());
        } catch (Exception e) {
            log.error("Erro inesperado ao processar notificação: {}", e.getMessage());
        }
    }
}