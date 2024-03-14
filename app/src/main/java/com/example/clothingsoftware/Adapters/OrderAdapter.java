package com.example.clothingsoftware.Adapters;

import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.Models.ArticleOrderModel;
import com.example.clothingsoftware.Models.ClientModel;
import com.example.clothingsoftware.Models.OrderModel;
import com.example.clothingsoftware.R;
import com.squareup.picasso.Picasso;

import java.util.List;
import java.util.Locale;

public class OrderAdapter extends RecyclerView.Adapter<OrderAdapter.OrderViewHolder> {

    private final List<OrderModel> orderList;
    private final List<ArticleOrderModel> articleOrderList;
    private final ClientModel clientModel;
    private OnOrderItemClickListener mListener;

    // Interface for item click listener
    public interface OnOrderItemClickListener {
        void onOrderItemClick(int position);
    }

    // Method to set item click listener
    public void setOnOrderItemClickListener(OnOrderItemClickListener listener) {
        mListener = listener;
    }

    // Constructor to initialize adapter with data
    public OrderAdapter(List<OrderModel> orderList, List<ArticleOrderModel> articleOrderList, ClientModel clientModel) {
        this.orderList = orderList;
        this.articleOrderList = articleOrderList;
        this.clientModel = clientModel;
    }

    // Create view holder for the adapter
    @NonNull
    @Override
    public OrderViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.order_item, parent, false);
        return new OrderViewHolder(view);
    }

    // Bind data to views in view holder
    @Override
    public void onBindViewHolder(@NonNull OrderViewHolder holder, int position) {
        OrderModel order = orderList.get(position);
        double total = 0;

        // Set order details
        holder.textViewStatus.setText(order.getStatus());

        // Set status text and color based on status
        String status = order.getStatus();
        holder.textViewStatus.setText(status);
        int statusColor = R.color.black; // Default color
        if (status.equalsIgnoreCase("Processing")) {
            statusColor = R.color.red; // Set to red for "Processing"
        } else if (status.equalsIgnoreCase("Shipped")) {
            statusColor = R.color.green; // Set to green for "Shipped"
        }
        holder.textViewStatus.setTextColor(ContextCompat.getColor(holder.itemView.getContext(), statusColor));
        holder.textViewOrderNumber.setText(order.getOrder_code());

        holder.textViewClientAddress.setText(clientModel.getAddress());


        // Clear previous articles
        holder.articleLinearLayout.removeAllViews();

        // Add articles dynamically
        for (ArticleOrderModel articleOrder : articleOrderList) {
            View articleView = LayoutInflater.from(holder.articleLinearLayout.getContext()).inflate(R.layout.articles_for_order, holder.articleLinearLayout, false);
            TextView textViewArticleName = articleView.findViewById(R.id.textViewArticleName);
            TextView textViewArticleSize = articleView.findViewById(R.id.textViewArticleSize);
            TextView textViewArticleColor = articleView.findViewById(R.id.textViewArticleColor);
            TextView textViewArticlePrice = articleView.findViewById(R.id.textViewArticlePrice);
            ImageView imageViewArticlePicture = articleView.findViewById(R.id.imageViewArticlePicture);

            textViewArticleName.setText(articleOrder.getTitle());
            textViewArticleSize.setText(String.format(Locale.getDefault(), "Size: %s", articleOrder.getSize()));
            textViewArticleColor.setText(String.format(Locale.getDefault(), "Color: %s", articleOrder.getColor()));

            // Remove currency symbol ('$') before parsing the price
            String priceString = articleOrder.getPrice().replace("$", "");
            double price = Double.parseDouble(priceString);
            textViewArticlePrice.setText(String.format(Locale.getDefault(), "$%.2f", price));
            total += price;

            // Three dots at the end of the text if the text doesn't fit horizontally
            textViewArticleName.setSingleLine(true);
            textViewArticleName.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticleName.setSingleLine(true);
            textViewArticleSize.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticleColor.setSingleLine(true);
            textViewArticleColor.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticlePrice.setSingleLine(true);
            textViewArticlePrice.setEllipsize(TextUtils.TruncateAt.END);

            // Load image using Picasso
            Picasso.get().load(articleOrder.getImageUrl()).into(imageViewArticlePicture);
            holder.articleLinearLayout.addView(articleView);
        }

        // Set total
        holder.textViewTotal.setText(String.format(Locale.getDefault(), "$%.2f", total));

        // Set click listener for button
        holder.button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int clickedPosition = holder.getAdapterPosition();
                if (mListener != null && clickedPosition != RecyclerView.NO_POSITION) {
                    mListener.onOrderItemClick(clickedPosition);
                }
            }
        });
    }



    // Get total number of items in the data set
    @Override
    public int getItemCount() {
        return orderList.size();
    }

    // View holder class to hold references to views
    public static class OrderViewHolder extends RecyclerView.ViewHolder {
        TextView textViewStatus, textViewOrderNumber, textViewClientAddress, textViewTotal;
        Button button;
        LinearLayout articleLinearLayout;

        public OrderViewHolder(@NonNull View itemView) {
            super(itemView);

            textViewStatus = itemView.findViewById(R.id.textViewStatus);
            textViewOrderNumber = itemView.findViewById(R.id.textViewOrderNumber);
            textViewClientAddress = itemView.findViewById(R.id.textViewClientAddress);
            textViewTotal = itemView.findViewById(R.id.textViewTotal);
            button = itemView.findViewById(R.id.orderSettingsButton);
            articleLinearLayout = itemView.findViewById(R.id.articleLinearLayout);
        }
    }
}
