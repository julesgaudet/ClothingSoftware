package com.example.clothingsoftware.Models;

import java.util.List;

public class PostModel {
    private String name;
    private String description;
    private String price;
    private String type;
    private String brand;
    private List<Size> sizes;
    private List<Color> colors;
    private List<Picture> pictures;

    public static class Size {
        private String sizeName;
        private int numberOfSize;

        public Size(String sizeName, int numberOfSize) {
            this.sizeName = sizeName;
            this.numberOfSize = numberOfSize;
        }

        public String getSizeName() {
            return sizeName;
        }

        public void setSizeName(String sizeName) {
            this.sizeName = sizeName;
        }

        public int getNumberOfSize() {
            return numberOfSize;
        }

        public void setNumberOfSize(int numberOfSize) {
            this.numberOfSize = numberOfSize;
        }
    }

    public static class Color {
        private String colorCode;

        public Color(String colorCode) {
            this.colorCode = colorCode;
        }

        public String getColorCode() {
            return colorCode;
        }

        public void setColorCode(String colorCode) {
            this.colorCode = colorCode;
        }
    }

    public static class Picture {
        private String url;

        public Picture(String url) {
            this.url = url;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public PostModel(String name, String description, String price, String type, String brand,
                     List<Size> sizes, List<Color> colors, List<Picture> pictures) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.type = type;
        this.brand = brand;
        this.sizes = sizes;
        this.colors = colors;
        this.pictures = pictures;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public List<Size> getSizes() {
        return sizes;
    }

    public void setSizes(List<Size> sizes) {
        this.sizes = sizes;
    }

    public List<Color> getColors() {
        return colors;
    }

    public void setColors(List<Color> colors) {
        this.colors = colors;
    }

    public List<Picture> getPictures() {
        return pictures;
    }

    public void setPictures(List<Picture> pictures) {
        this.pictures = pictures;
    }
}
