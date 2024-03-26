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
    private OnOrderItemClickListener mListener;

    public interface OnOrderItemClickListener {
        void onOrderItemClick(int position);
    }

    public void setOnOrderItemClickListener(OnOrderItemClickListener listener) {
        mListener = listener;
    }

    public OrderAdapter(List<OrderModel> orderList, ClientModel clientModel) {
        this.orderList = orderList;
    }

    @NonNull
    @Override
    public OrderViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.order_item, parent, false);
        return new OrderViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull OrderViewHolder holder, int position) {
        OrderModel order = orderList.get(position);
        double total = 0;

        holder.textViewStatus.setText(order.getStatus());

        String status = order.getStatus();
        holder.textViewStatus.setText(status);
        int statusColor = R.color.black;
        if (status.equalsIgnoreCase("Processing")) {
            statusColor = R.color.red;
        } else if (status.equalsIgnoreCase("Shipped")) {
            statusColor = R.color.green;
        }
        holder.textViewStatus.setTextColor(ContextCompat.getColor(holder.itemView.getContext(), statusColor));
        holder.textViewOrderNumber.setText(order.getOrder_code());

        holder.articleLinearLayout.removeAllViews();

        List<ArticleOrderModel> articleOrderList = order.getArticleOrderList();

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

            String priceString = articleOrder.getPrice().replace("$", "");
            double price = Double.parseDouble(priceString);
            textViewArticlePrice.setText(String.format(Locale.getDefault(), "%.2f$", price));
            total += price;

            textViewArticleName.setSingleLine(true);
            textViewArticleName.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticleSize.setSingleLine(true);
            textViewArticleSize.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticleColor.setSingleLine(true);
            textViewArticleColor.setEllipsize(TextUtils.TruncateAt.END);
            textViewArticlePrice.setSingleLine(true);
            textViewArticlePrice.setEllipsize(TextUtils.TruncateAt.END);

            Picasso.get().load(articleOrder.getImageUrl()).into(imageViewArticlePicture);
            holder.articleLinearLayout.addView(articleView);
        }

        holder.textViewTotal.setText(String.format(Locale.getDefault(), "%.2f$", total));

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

    @Override
    public int getItemCount() {
        return orderList.size();
    }

    public static class OrderViewHolder extends RecyclerView.ViewHolder {
        TextView textViewStatus, textViewOrderNumber, textViewClientAddress, textViewTotal;
        Button button;
        LinearLayout articleLinearLayout;

        public OrderViewHolder(@NonNull View itemView) {
            super(itemView);

            textViewStatus = itemView.findViewById(R.id.textViewStatus);
            textViewOrderNumber = itemView.findViewById(R.id.textViewOrderNumber);
            textViewTotal = itemView.findViewById(R.id.textViewTotal);
            button = itemView.findViewById(R.id.orderSettingsButton);
            articleLinearLayout = itemView.findViewById(R.id.articleLinearLayout);
        }
    }

    public void setOrderList(List<OrderModel> orderList) {
        this.orderList.clear();
        this.orderList.addAll(orderList);
        notifyDataSetChanged();
    }
}