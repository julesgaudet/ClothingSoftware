package com.example.clothingsoftware.Fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.Activities.MoreOrder;
import com.example.clothingsoftware.Adapters.OrderAdapter;
import com.example.clothingsoftware.Class.OrderManager;
import com.example.clothingsoftware.Models.ClientModel;
import com.example.clothingsoftware.Models.OrderModel;
import com.example.clothingsoftware.R;

import java.util.ArrayList;
import java.util.List;

public class Orders extends Fragment implements OrderAdapter.OnOrderItemClickListener {

    private List<OrderModel> orderList;
    private ClientModel clientModel;
    private OrderAdapter orderAdapter;
    private OrderManager orderManager;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_orders, container, false);

        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewOrders);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        orderList = new ArrayList<>();
        clientModel = new ClientModel();

        orderAdapter = new OrderAdapter(orderList, clientModel);
        orderAdapter.setOnOrderItemClickListener(this);
        recyclerView.setAdapter(orderAdapter);

        orderManager = new OrderManager(getContext());

        fetchOrders();

        return view;
    }

    private void fetchOrders() {
        orderManager.getAllOrders(orderAdapter, this);
    }

    public void onOrderItemClick(int position) {
        if (orderList != null && orderList.size() > position) {
            OrderModel clickedOrder = orderList.get(position);
            Intent intent = new Intent(getContext(), MoreOrder.class);
            intent.putExtra("ORDER_CODE", clickedOrder.getOrder_code());
            intent.putExtra("CLIENT_ADDRESS", clientModel.getAddress());
            intent.putExtra("ORDER_DATE", clickedOrder.getDate());
            intent.putExtra("ORDER_PAYMENT_OPTION", clickedOrder.getPayment_option());

            intent.putExtra("CLIENT_EMAIL", clientModel.getEmail());
            intent.putExtra("CLIENT_FIRST_NAME", clientModel.getFirst_name());
            intent.putExtra("CLIENT_LAST_NAME", clientModel.getLast_name());
            intent.putExtra("CLIENT_CITY", clientModel.getCity());
            intent.putExtra("CLIENT_REGION_STATE", clientModel.getRegion_state());
            intent.putExtra("CLIENT_COUNTRY", clientModel.getCountry());
            intent.putExtra("CLIENT_ZIP_CODE", clientModel.getZip_code());

            startActivity(intent);
        } else {
            Log.e("Orders", "No item found at position: " + position);
        }
    }
}
