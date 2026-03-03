package com.example.demo.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Suany Cakes")
                .version("1.0.0")
                .description("Platform for help in logistics and in the sale of sweet and savory" +
                        "The objective is to provide to customers a more efficient and dynamic service and facilitate the management and production of Suany Cakes."));
    }
}
