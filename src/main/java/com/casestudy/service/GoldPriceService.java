package com.casestudy.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class GoldPriceService {
    
    private final WebClient webClient;
    private static final String GOLD_API_URL = "https://api.metals.live/v1/spot/gold";
    
    public GoldPriceService() {
        this.webClient = WebClient.builder()
                .baseUrl(GOLD_API_URL)
                .build();
    }
    
    public Mono<Double> getCurrentGoldPrice() {
        return webClient.get()
                .retrieve()
                .bodyToMono(GoldPriceResponse.class)
                .map(response -> response.getPrice())
                .onErrorReturn(2000.0); // Fallback price if API fails
    }
    
    // Inner class for API response
    private static class GoldPriceResponse {
        private double price;
        
        public double getPrice() {
            return price;
        }
        
        public void setPrice(double price) {
            this.price = price;
        }
    }
}
