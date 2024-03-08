package com.example.clothingsoftware.Models;

import java.util.List;

public class FeedModel {
    private String title;
    private String price;
    private List<String> colors;
    private List<String> sizes;
    private List<String> imageUrls;

    public String getTitle() {
        return title;
    }

    public String getPrice() {
        return price;
    }

    public List<String> getColors() {
        return colors;
    }

    public List<String> getSizes() {
        return sizes;
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

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}