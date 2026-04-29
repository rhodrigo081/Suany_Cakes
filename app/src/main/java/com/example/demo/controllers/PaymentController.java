package com.example.demo.controllers;

import com.example.demo.config.WebhookSignatureValidator;
import com.example.demo.dtos.request.PaymentRequestDTO;
import com.example.demo.dtos.response.PaymentResponseDTO;
import com.example.demo.models.User;
import com.example.demo.services.PaymentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
@Slf4j
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private WebhookSignatureValidator signatureValidator;

    @PostMapping("/process")
    public ResponseEntity<PaymentResponseDTO> createPayment(
            @RequestBody @Valid PaymentRequestDTO dto,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(paymentService.processPayment(dto, user.getEmail()));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(
            @RequestBody Map<String, Object> payload,
            @RequestHeader(value = "x-signature", required = false) String signature,
            @RequestHeader(value = "x-request-id", required = false) String requestId) {

        String type = String.valueOf(payload.get("type")); // Captura o tipo (payment, order, etc)
        Map<String, Object> data = (Map<String, Object>) payload.get("data");
        String dataId = (data != null) ? String.valueOf(data.get("id")) : null;

        log.info("Webhook recebido - Tipo: {}, DataID: {}", type, dataId);

        if (dataId == null || dataId.equals("null")) {
            return ResponseEntity.ok().build();
        }

        if (!signatureValidator.isValid(signature, requestId, dataId)) {
            log.warn("Webhook rejeitado: assinatura inválida");

        }


        paymentService.handleNotification(dataId, type);

        return ResponseEntity.ok().build();
    }
}