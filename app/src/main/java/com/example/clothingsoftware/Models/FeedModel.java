package com.example.clothingsoftware.Models;

public class FeedModel {
    String name;
    String price;
    String size;
    int image1;
    int image2;
    int image3;
    int image4;

    public FeedModel(String name, String price, String size,
                     int image1, int image2, int image3, int image4) {
        this.name = name;
        this.price = price;
        this.size = size;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
    }

    public String getName() {
        return name;
    }

    public String getPrice() {
        return price;
    }

    public String getSize() {
        return size;
    }

    public int getImage1() {
        return image1;
    }

    public int getImage2() {
        return image2;
    }

    public int getImage3() {
        return image3;
    }

    public int getImage4() {
        return image4;
    }
}