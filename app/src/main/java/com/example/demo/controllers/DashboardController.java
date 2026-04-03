package com.example.demo.controllers;

import java.util.List;

import com.example.demo.dtos.*;
import com.example.demo.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.DashboardService;
import com.example.demo.services.OrderService;

@RestController
@RequestMapping("/admin")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/dailysales")
    public ResponseEntity<List<DailySalesDTO>> getThirtyDaysAgoSales() {
        return ResponseEntity.ok(dashboardService.getThirtyDaysAgoSales());
    }

    @GetMapping("/salesByCategory")
    public ResponseEntity<List<CategorySalesDTO>> getSalesByCategory() {
        return ResponseEntity.ok(dashboardService.getSalesByCategory());
    }

    @GetMapping("/count-all-orders")
    public ResponseEntity<Long> getOrderQuantity() {
        return ResponseEntity.ok(orderService.getAllOrdersQuantity());
    }

    @GetMapping("/count-all-products")
    public ResponseEntity<Long> getProductQuantity() {
        return ResponseEntity.ok(productService.getAllProductsQuantity());
    }

    @GetMapping("/products/top-selling")
    public ResponseEntity<List<ProductRankingDTO>> getTopSelling() {
        return ResponseEntity.ok(productService.getTopSelling());
    }

    @GetMapping("/products/low-selling")
    public ResponseEntity<List<ProductRankingDTO>> getLowSelling() {
        return ResponseEntity.ok(productService.getLowSelling());
    }
}
