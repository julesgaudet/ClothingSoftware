package com.example.clothingsoftware.Models;

public class OrderModel {
    private String order_code;
    private String Date;
    private String Status;

    public void setOrder_code(String order_code) {
        this.order_code = order_code;
    }

    public void setDate(String date) {
        Date = date;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getOrder_code() {
        return order_code;
    }

    public String getDate() {
        return Date;
    }

    public String getStatus() {
        return Status;
    }
}
