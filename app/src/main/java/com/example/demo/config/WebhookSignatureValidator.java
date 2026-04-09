package com.example.demo.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Component
@Slf4j
public class WebhookSignatureValidator {

    @Value("${MP_WEBHOOK_SECRET}")
    private String webhookSecret;

    public boolean isValid(String xSignature, String xRequestId, String dataId) {
        if (xSignature == null || xRequestId == null || dataId == null) {
            log.warn("Webhook recebido com headers obrigatórios ausentes");
            return false;
        }

        try {
            String ts = null;
            String v1 = null;

            for (String part : xSignature.split(",")) {
                String[] kv = part.trim().split("=", 2);
                if (kv.length == 2) {
                    if ("ts".equals(kv[0].trim()))  ts = kv[1].trim();
                    if ("v1".equals(kv[0].trim()))  v1 = kv[1].trim();
                }
            }

            if (ts == null || v1 == null) {
                log.warn("x-signature com formato inválido: {}", xSignature);
                return false;
            }

            String template = "id:" + dataId + ";request-id:" + xRequestId + ";ts:" + ts + ";";

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] hash = mac.doFinal(template.getBytes(StandardCharsets.UTF_8));

            String computed = bytesToHex(hash);

            return MessageDigest.isEqual(computed.getBytes(), v1.getBytes());

        } catch (Exception e) {
            log.error("Erro ao validar assinatura do webhook: {}", e.getMessage());
            return false;
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}
