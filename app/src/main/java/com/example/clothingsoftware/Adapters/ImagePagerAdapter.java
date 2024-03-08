package com.example.clothingsoftware.Adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.clothingsoftware.R;
import com.squareup.picasso.Picasso;

import java.util.List;

public class ImagePagerAdapter extends RecyclerView.Adapter<ImagePagerAdapter.ImageViewHolder> {

    private final List<String> imageUrls;
    private final LinearLayout dotsContainer;

    public ImagePagerAdapter(List<String> imageUrls, LinearLayout dotsContainer) {
        this.imageUrls = imageUrls;
        this.dotsContainer = dotsContainer;
        initDots(); // Initialize dots
    }

    @NonNull
    @Override
    public ImageViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.image_item, parent, false);
        return new ImageViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ImageViewHolder holder, int position) {
        String imageUrl = imageUrls.get(position);
        Picasso.get().load(imageUrl).into(holder.imageView);
    }


    @Override
    public int getItemCount() {
        return imageUrls.size();
    }

    static class ImageViewHolder extends RecyclerView.ViewHolder {
        ImageView imageView;

        ImageViewHolder(@NonNull View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.imageView);
        }
    }

    private void initDots() {
        // Clear previous dots
        dotsContainer.removeAllViews();

        // Add dots dynamically
        for (int i = 0; i < imageUrls.size(); i++) {
            View dotView = LayoutInflater.from(dotsContainer.getContext()).inflate(R.layout.dot_image, dotsContainer, false);
            dotsContainer.addView(dotView);
        }
    }
}
