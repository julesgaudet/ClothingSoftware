package com.example.clothingsoftware.Fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.Activities.MoreOrder;
import com.example.clothingsoftware.Adapters.OrderAdapter;
import com.example.clothingsoftware.Models.ArticleOrderModel;
import com.example.clothingsoftware.Models.ClientModel;
import com.example.clothingsoftware.Models.OrderModel;
import com.example.clothingsoftware.R;

import java.util.ArrayList;
import java.util.List;

public class Orders extends Fragment implements OrderAdapter.OnOrderItemClickListener {

    // Declare orderList and clientModel as member variables
    private List<OrderModel> orderList;
    private ClientModel clientModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_orders, container, false);

        // Initialize RecyclerView
        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewOrders);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Initialize orderList
        orderList = new ArrayList<>();

        // Initialize Article Order List
        List<ArticleOrderModel> articleOrderList = new ArrayList<>();

        // First Order
        OrderModel order1 = new OrderModel();
        order1.setOrder_code("ODR1234");
        order1.setStatus("Shipped");
        order1.setDate("2023-05-12");
        order1.setPayment_option("Credit Card");
        orderList.add(order1);

        // Add dummy article order items
        ArticleOrderModel articleOrder1 = new ArticleOrderModel();
        articleOrder1.setTitle("Enchanté T-Shirt");
        articleOrder1.setPrice("125$");
        articleOrder1.setBrand("Nike");
        articleOrder1.setColor("#345432");
        articleOrder1.setImageUrls("https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465");
        articleOrder1.setSize("S");
        articleOrderList.add(articleOrder1);

        ArticleOrderModel articleOrder2 = new ArticleOrderModel();
        articleOrder2.setTitle("Enchanté T-Shirt");
        articleOrder2.setPrice("125$");
        articleOrder2.setBrand("Nike");
        articleOrder2.setColor("#345432");
        articleOrder2.setImageUrls("https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465");
        articleOrder2.setSize("S");
        articleOrderList.add(articleOrder2);

        ArticleOrderModel articleOrder3 = new ArticleOrderModel();
        articleOrder3.setTitle("Enchanté T-Shirt");
        articleOrder3.setPrice("125$");
        articleOrder3.setBrand("Nike");
        articleOrder3.setColor("#345432");
        articleOrder3.setImageUrls("https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465");
        articleOrder3.setSize("S");
        articleOrderList.add(articleOrder3);

        // Initialize clientModel (Dummy data)
        clientModel = new ClientModel();
        clientModel.setEmail("john.doe@example.com");
        clientModel.setFirst_name("John");
        clientModel.setLast_name("Doe");
        clientModel.setAddress("123 Main Street");
        clientModel.setCity("Repentigny");
        clientModel.setRegion_state("Quebec");
        clientModel.setCountry("Canada");
        clientModel.setZip_code("12345");

        // Second Order
        OrderModel order2 = new OrderModel();
        order2.setOrder_code("ODR5678");
        order2.setStatus("Processing");
        order2.setDate("2023-06-25");
        order2.setPayment_option("PayPal");
        orderList.add(order2);

        // Create adapter and set it to RecyclerView
        OrderAdapter orderAdapter = new OrderAdapter(orderList, articleOrderList, clientModel);
        orderAdapter.setOnOrderItemClickListener(this);
        recyclerView.setAdapter(orderAdapter);

        return view;
    }

    @Override
    public void onOrderItemClick(int position) {
        // Get the clicked order details from the clicked position
        OrderModel clickedOrder = orderList.get(position);
        // Create an intent to start the MoreOrder activity
        Intent intent = new Intent(getContext(), MoreOrder.class);
        // Add the order data as extras to the intent
        intent.putExtra("ORDER_CODE", clickedOrder.getOrder_code());
        intent.putExtra("CLIENT_ADDRESS", clientModel.getAddress());
        intent.putExtra("ORDER_DATE", clickedOrder.getDate());
        intent.putExtra("ORDER_PAYMENT_OPTION", clickedOrder.getPayment_option());

        // Add all the clientModel information to the intent
        intent.putExtra("CLIENT_EMAIL", clientModel.getEmail());
        intent.putExtra("CLIENT_FIRST_NAME", clientModel.getFirst_name());
        intent.putExtra("CLIENT_LAST_NAME", clientModel.getLast_name());
        intent.putExtra("CLIENT_CITY", clientModel.getCity());
        intent.putExtra("CLIENT_REGION_STATE", clientModel.getRegion_state());
        intent.putExtra("CLIENT_COUNTRY", clientModel.getCountry());
        intent.putExtra("CLIENT_ZIP_CODE", clientModel.getZip_code());

        // Start the activity with the intent
        startActivity(intent);
    }
}
