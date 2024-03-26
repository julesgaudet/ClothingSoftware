package com.example.clothingsoftware.Models;

import java.util.List;

public class OrderModel {
    private String order_code;
    private String Date;
    private String status;
    private String payment_option;
    private List<ArticleOrderModel> articleOrderList;
    private ClientModel clientModel;

    // Getters and Setters

    public String getOrder_code() {
        return order_code;
    }

    public void setOrder_code(String order_code) {
        this.order_code = order_code;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPayment_option() {
        return payment_option;
    }

    public void setPayment_option(String payment_option) {
        this.payment_option = payment_option;
    }

    public List<ArticleOrderModel> getArticleOrderList() {
        return articleOrderList;
    }

    public void setArticleOrderList(List<ArticleOrderModel> articleOrderList) {
        this.articleOrderList = articleOrderList;
    }

    public ClientModel getClientModel() {
        return clientModel;
    }

    public void setClientModel(ClientModel clientModel) {
        this.clientModel = clientModel;
    }
}
