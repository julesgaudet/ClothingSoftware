package com.example.clothingsoftware.Models;

import java.util.List;
import java.util.Map;

public class FeedModel {
    private String title;
    private String price;
    private List<String> colors;
    private List<String> imageUrls;
    private String description;
    private Map<String, Integer> itemsPerSize;
    private String brand;

    public String getTitle() {
        return title;
    }

    public String getPrice() {
        return price;
    }

    public String getBrand() { return brand; }

    public String getDescription() { return description; }

    public List<String> getColors() {
        return colors;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public void setDescription(String description) { this.description = description; }

    public void setItemsPerSize(Map<String, Integer> itemsPerSize) {
        this.itemsPerSize = itemsPerSize;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
    public Map<String, Integer> getItemsPerSize() {
        return itemsPerSize;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}