package com.casestudy.service;

import com.casestudy.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private GoldPriceService goldPriceService;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public List<Product> getAllProducts() {
        try {
            // Load products from JSON file
            ClassPathResource resource = new ClassPathResource("data/products.json");
            List<Product> products = objectMapper.readValue(
                resource.getInputStream(),
                new TypeReference<List<Product>>() {}
            );
            
            // Calculate prices for all products
            return products.stream()
                    .map(this::calculatePrice)
                    .collect(Collectors.toList());
                    
        } catch (IOException e) {
            throw new RuntimeException("Error loading products", e);
        }
    }
    
    public List<Product> getFilteredProducts(Double minPrice, Double maxPrice, Double minPopularity, Double maxPopularity) {
        List<Product> allProducts = getAllProducts();
        
        return allProducts.stream()
                .filter(product -> minPrice == null || product.getPrice() >= minPrice)
                .filter(product -> maxPrice == null || product.getPrice() <= maxPrice)
                .filter(product -> minPopularity == null || product.getPopularityScore() >= minPopularity)
                .filter(product -> maxPopularity == null || product.getPopularityScore() <= maxPopularity)
                .collect(Collectors.toList());
    }
    
    private Product calculatePrice(Product product) {
        // Price = (popularityScore + 1) * weight * goldPrice
        double goldPrice = goldPriceService.getCurrentGoldPrice().block();
        double price = (product.getPopularityScore() + 1) * product.getWeight() * goldPrice;
        product.setPrice(Math.round(price * 100.0) / 100.0); // Round to 2 decimal places
        return product;
    }
}
