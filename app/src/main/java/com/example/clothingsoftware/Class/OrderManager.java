package com.example.clothingsoftware.Class;

import android.content.Context;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

import com.example.clothingsoftware.Adapters.OrderAdapter;
import com.example.clothingsoftware.Models.ArticleOrderModel;
import com.example.clothingsoftware.Models.ClientModel;
import com.example.clothingsoftware.Models.OrderModel;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class OrderManager {
    private final Context context;
    private final OkHttpClient client;
    private ClientModel clientModel; // Declare clientModel at the class level

    public OrderManager(Context context) {
        this.context = context;
        this.client = new OkHttpClient();
    }

    public void getAllOrders(Fragment fragment, final OrderManagerCallback callback) {
        String url = "http://10.0.2.2:80/api/app/orders";

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
                fragment.requireActivity().runOnUiThread(() -> {
                    Toast.makeText(context, "Error fetching orders", Toast.LENGTH_SHORT).show();
                });
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    assert response.body() != null;
                    String responseData = response.body().string();
                    try {
                        List<OrderModel> orderList = new ArrayList<>();
                        JSONArray jsonArray = new JSONArray(responseData);
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject jsonOrder = jsonArray.getJSONObject(i);

                            OrderModel order = new OrderModel();
                            order.setOrder_code("ODR" + jsonOrder.getInt("id_orders"));
                            order.setStatus(jsonOrder.getString("status"));
                            order.setDate(jsonOrder.getString("date"));
                            order.setPayment_option(jsonOrder.getString("payment_option"));
                            // Parse client details
                            JSONObject jsonClient = jsonOrder.getJSONObject("client");
                            clientModel = new ClientModel(); // Initialize clientModel here
                            clientModel.setEmail(jsonClient.getString("email"));
                            clientModel.setFirst_name(jsonClient.getString("first_name"));
                            clientModel.setLast_name(jsonClient.getString("last_name"));
                            clientModel.setAddress(jsonClient.getString("address"));
                            clientModel.setCity(jsonClient.getString("city"));
                            clientModel.setRegion_state(jsonClient.getString("region_state"));
                            clientModel.setCountry(jsonClient.getString("country"));
                            clientModel.setZip_code(jsonClient.getString("zip_code"));
                            order.setClientModel(clientModel);

                            // Parse article cart
                            JSONArray jsonArticleCart = jsonOrder.getJSONArray("article_cart");
                            List<ArticleOrderModel> articleOrderList = new ArrayList<>();
                            for (int j = 0; j < jsonArticleCart.length(); j++) {
                                JSONObject jsonArticle = jsonArticleCart.getJSONObject(j);
                                ArticleOrderModel article = new ArticleOrderModel();
                                article.setTitle(jsonArticle.getString("name"));
                                article.setPrice(jsonArticle.getString("price"));
                                article.setColor(jsonArticle.getString("color"));
                                article.setSize(jsonArticle.getString("size"));
                                article.setImageUrl(jsonArticle.getString("first_picture"));

                                articleOrderList.add(article);
                            }
                            order.setArticleOrderList(articleOrderList);

                            // Add OrderModel to the list
                            orderList.add(order);
                        }

                        fragment.requireActivity().runOnUiThread(() -> {
                            callback.onOrdersReceived(orderList, clientModel); // Pass clientModel to callback
                        });

                    } catch (JSONException e) {
                        e.printStackTrace();
                        fragment.requireActivity().runOnUiThread(() -> {
                            Toast.makeText(context, "Error parsing JSON", Toast.LENGTH_SHORT).show();
                        });
                    }
                } else {
                    fragment.requireActivity().runOnUiThread(() -> {
                        Toast.makeText(context, "Error fetching orders", Toast.LENGTH_SHORT).show();
                    });
                }
            }
        });
    }

    public interface OrderManagerCallback {
        void onOrdersReceived(List<OrderModel> orderList, ClientModel clientModel);
    }
}
