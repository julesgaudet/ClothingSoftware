package com.example.clothingsoftware.Models;

public class OrderModel {
    private String order_code;
    private String Date;
    private String status;
    private String payment_option;

    public String getOrder_code() {
        return order_code;
    }

    public String getPayment_option() {
        return payment_option;
    }

    public String getDate() {
        return Date;
    }

    public String getStatus() {
        return status;
    }

    public void setOrder_code(String order_code) {
        this.order_code = order_code;
    }

    public void setDate(String date) {
        Date = date;
    }

    public void setPayment_option(String payment_option) {
        this.payment_option = payment_option;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
