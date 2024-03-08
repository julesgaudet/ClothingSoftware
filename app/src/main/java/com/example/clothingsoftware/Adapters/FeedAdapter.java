package com.example.clothingsoftware.Adapters;

import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;

import java.util.List;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.FeedViewHolder> {

    private final List<FeedModel> feedModels;

    public FeedAdapter(List<FeedModel> feedModels) {
        this.feedModels = feedModels;
    }

    @Override
    public int getItemCount() {
        return feedModels.size();
    }

    @NonNull
    @Override
    public FeedViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(
                R.layout.post_item,
                parent,
                false
        );
        ViewPager2 imageContainer = view.findViewById(R.id.imageContainer);
        return new FeedViewHolder(view, imageContainer);
    }

    @Override
    public void onBindViewHolder(@NonNull FeedViewHolder holder, int position) {
        holder.setPhotoData(feedModels.get(position));

        ImagePagerAdapter imagePagerAdapter = new ImagePagerAdapter(feedModels.get(position).getImageUrls());
        holder.imageContainer.setAdapter(imagePagerAdapter);
    }

    public static class FeedViewHolder extends RecyclerView.ViewHolder {

        TextView title, price, size;
        ViewPager2 imageContainer;

        public FeedViewHolder(@NonNull View itemView, ViewPager2 imageContainer) {
            super(itemView);
            this.imageContainer = imageContainer;
            title = itemView.findViewById(R.id.titleText);
            price = itemView.findViewById(R.id.priceText);
            size = itemView.findViewById(R.id.sizeText);
        }

        void setPhotoData(FeedModel feedModel) {
            title.setText(feedModel.getTitle());
            price.setText(feedModel.getPrice());

            List<String> colors = feedModel.getColors();
            LinearLayout colorContainer = itemView.findViewById(R.id.colorContainer);
            colorContainer.removeAllViews(); // Clear previous views

            for (String color : colors) {
                View colorView = LayoutInflater.from(itemView.getContext()).inflate(
                        R.layout.color_item, // Layout for each color item
                        colorContainer,
                        false
                );
                // Set color background or other properties
                Drawable circleDrawable = colorView.findViewById(R.id.circleColorView).getBackground();
                circleDrawable.setColorFilter(Color.parseColor(color), PorterDuff.Mode.SRC_ATOP);
                colorContainer.addView(colorView);
            }

            List<String> sizes = feedModel.getSizes();
            LinearLayout sizeContainer = itemView.findViewById(R.id.sizeContainer);
            sizeContainer.removeAllViews(); // Clear previous views

            for (String size : sizes) {
                TextView sizeTextView = (TextView) LayoutInflater.from(itemView.getContext()).inflate(
                        R.layout.size_item, // Layout for each size item
                        sizeContainer,
                        false
                );
                sizeTextView.setText(size);
                sizeContainer.addView(sizeTextView);
            }
        }
    }
}
