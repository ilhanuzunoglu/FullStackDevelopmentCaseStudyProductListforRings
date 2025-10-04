package com.casestudy.controller;

import com.casestudy.model.Product;
import com.casestudy.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allow CORS for frontend
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getFilteredProducts(
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minPopularity,
            @RequestParam(required = false) Double maxPopularity) {
        
        List<Product> products = productService.getFilteredProducts(
            minPrice, maxPrice, minPopularity, maxPopularity);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        List<Product> products = productService.getAllProducts();
        if (id >= 0 && id < products.size()) {
            return ResponseEntity.ok(products.get(id.intValue()));
        }
        return ResponseEntity.notFound().build();
    }
}
