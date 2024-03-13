package com.example.clothingsoftware.Models;

public class ArticleOrderModel {
    private String title;
    private String price;
    private String color;
    private String imageUrl;
    private String Size;
    private String brand;


    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setImageUrls(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setSize(String size) {
        Size = size;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getTitle() {
        return title;
    }

    public String getPrice() {
        return price;
    }

    public String getColor() {
        return color;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getSize() {
        return Size;
    }

    public String getBrand() {
        return brand;
    }
}
