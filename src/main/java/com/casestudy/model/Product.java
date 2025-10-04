package com.casestudy.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {
    private String name;
    
    @JsonProperty("popularityScore")
    private double popularityScore;
    
    private double weight;
    private Images images;
    private double price;
    
    // Constructors
    public Product() {}
    
    public Product(String name, double popularityScore, double weight, Images images) {
        this.name = name;
        this.popularityScore = popularityScore;
        this.weight = weight;
        this.images = images;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public double getPopularityScore() {
        return popularityScore;
    }
    
    public void setPopularityScore(double popularityScore) {
        this.popularityScore = popularityScore;
    }
    
    public double getWeight() {
        return weight;
    }
    
    public void setWeight(double weight) {
        this.weight = weight;
    }
    
    public Images getImages() {
        return images;
    }
    
    public void setImages(Images images) {
        this.images = images;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
    
    // Inner class for images
    public static class Images {
        private String yellow;
        private String white;
        private String rose;
        
        // Constructors
        public Images() {}
        
        public Images(String yellow, String white, String rose) {
            this.yellow = yellow;
            this.white = white;
            this.rose = rose;
        }
        
        // Getters and Setters
        public String getYellow() {
            return yellow;
        }
        
        public void setYellow(String yellow) {
            this.yellow = yellow;
        }
        
        public String getWhite() {
            return white;
        }
        
        public void setWhite(String white) {
            this.white = white;
        }
        
        public String getRose() {
            return rose;
        }
        
        public void setRose(String rose) {
            this.rose = rose;
        }
    }
}
