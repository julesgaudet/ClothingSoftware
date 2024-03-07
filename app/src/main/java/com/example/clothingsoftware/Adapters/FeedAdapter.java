package com.example.clothingsoftware.Adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;
import com.squareup.picasso.Picasso;

import java.util.List;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.FeedViewHolder>{

    private final List<FeedModel> feedModels;

    public FeedAdapter(List<FeedModel> feedModels) {
        this.feedModels = feedModels;
    }

    @NonNull
    @Override
    public FeedViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new FeedViewHolder(
                LayoutInflater.from(parent.getContext()).inflate(
                        R.layout.post_item,
                        parent,
                        false
                )
        );
    }

    @Override
    public void onBindViewHolder(@NonNull FeedViewHolder holder, int position) {
        holder.setPhotoData(feedModels.get(position));
    }

    @Override
    public int getItemCount() {
        return feedModels.size();
    }

    static class FeedViewHolder extends RecyclerView.ViewHolder {

        ImageView imageView1;
        ImageView imageView2;
        ImageView imageView3;
        ImageView imageView4;
        TextView title, price, size;

        public FeedViewHolder(@NonNull View itemView) {
            super(itemView);
            imageView1 = itemView.findViewById(R.id.imageView1);
            imageView2 = itemView.findViewById(R.id.imageView2);
            imageView3 = itemView.findViewById(R.id.imageView3);
            imageView4 = itemView.findViewById(R.id.imageView4);
            title = itemView.findViewById(R.id.titleText);
            price = itemView.findViewById(R.id.priceText);
            size = itemView.findViewById(R.id.sizeText);
        }

        void setPhotoData(FeedModel feedModel) {
            title.setText(feedModel.getTitle());
            price.setText(feedModel.getPrice());
            size.setText(feedModel.getSize());

            Picasso.get().load(feedModel.getImage1URL()).into(imageView1);
            Picasso.get().load(feedModel.getImage2URL()).into(imageView2);
            Picasso.get().load(feedModel.getImage3URL()).into(imageView3);
            Picasso.get().load(feedModel.getImage4URL()).into(imageView4);
        }
    }
}

