package com.example.demo.tasks;

import com.example.demo.repositories.ProductRepository;
import com.example.demo.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FeaturedTask {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Scheduled(cron = "0 0 0 * * *")
    public void refreshFeatured() {
        productService.updateAllProductsPopularity();
    }

}
