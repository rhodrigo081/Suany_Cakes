package com.example.demo.mappers;

import com.example.demo.enums.OrderStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OrderMapper {

    public OrderStatus mapMpStatusToOrderStatus(String mpStatus) {
        return switch (mpStatus) {
            case "approved", "processed" -> OrderStatus.CONFIRMED;
            case "rejected", "cancelled" -> OrderStatus.CANCELLED;
            case "in_process", "pending" -> OrderStatus.PENDING;
            default -> {
                log.warn("Status não mapeado recebido: {}", mpStatus);
                yield OrderStatus.PENDING;
            }
        };
    }
}
