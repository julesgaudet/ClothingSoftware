package com.example.clothingsoftware.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;

import java.util.ArrayList;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.MyViewHolder> {
    Context context;
    ArrayList<FeedModel> feedModel;
    public FeedAdapter(Context context, ArrayList<FeedModel> feedModel) {
        this.context = context;
        this.feedModel = feedModel;
    }

    @NonNull
    @Override
    public FeedAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.post_item, parent, false);

        return new FeedAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FeedAdapter.MyViewHolder holder, int position) {
        holder.titleText.setText(feedModel.get(position).getName());
        holder.priceText.setText(feedModel.get(position).getPrice());
        holder.sizeText.setText(feedModel.get(position).getSize());
        holder.imageView1.setImageResource(feedModel.get(position).getImage1());
        holder.imageView2.setImageResource(feedModel.get(position).getImage2());
        holder.imageView3.setImageResource(feedModel.get(position).getImage3());
        holder.imageView4.setImageResource(feedModel.get(position).getImage4());
    }

    @Override
    public int getItemCount() {
        return feedModel.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        ImageView imageView1, imageView2, imageView3, imageView4;
        TextView titleText, priceText, sizeText;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView1 = itemView.findViewById(R.id.imageView1);
            imageView2 = itemView.findViewById(R.id.imageView2);
            imageView3 = itemView.findViewById(R.id.imageView3);
            imageView4 = itemView.findViewById(R.id.imageView4);

            titleText = itemView.findViewById(R.id.titleText);
            priceText = itemView.findViewById(R.id.priceText);
            sizeText = itemView.findViewById(R.id.sizeText);
        }
    }
}
