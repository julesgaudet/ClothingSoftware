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
import java.util.Map;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.FeedViewHolder> {

    private final List<FeedModel> feedModels;
    private OnMoreButtonClickListener onMoreButtonClickListener;

    public FeedAdapter(List<FeedModel> feedModels) {
        this.feedModels = feedModels;
    }

    public void setOnMoreButtonClickListener(OnMoreButtonClickListener listener) {
        this.onMoreButtonClickListener = listener;
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
        holder.setPhotoData(feedModels.get(holder.getAdapterPosition()));

        ImagePagerAdapter imagePagerAdapter = new ImagePagerAdapter(feedModels.get(holder.getAdapterPosition()).getImageUrls(), holder.dotsContainer); // Corrected usage of holder.getAdapterPosition()
        holder.imageContainer.setAdapter(imagePagerAdapter);

        holder.buttonMore.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (onMoreButtonClickListener != null) {
                    onMoreButtonClickListener.onMoreButtonClick(holder.getAdapterPosition()); // Corrected usage of holder.getAdapterPosition()
                }
            }
        });
    }

    public static class FeedViewHolder extends RecyclerView.ViewHolder {

        TextView title, price, size;
        ViewPager2 imageContainer;
        LinearLayout dotsContainer;
        TextView buttonMore;

        public FeedViewHolder(@NonNull View itemView, ViewPager2 imageContainer) {
            super(itemView);
            this.imageContainer = imageContainer;
            title = itemView.findViewById(R.id.titleText);
            price = itemView.findViewById(R.id.priceText);
            size = itemView.findViewById(R.id.sizeText);
            dotsContainer = itemView.findViewById(R.id.dotsContainer);
            buttonMore = itemView.findViewById(R.id.buttonMore);
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

            Map<String, Integer> itemsPerSize = feedModel.getItemsPerSize();
            LinearLayout sizeContainer = itemView.findViewById(R.id.sizeContainer);
            sizeContainer.removeAllViews(); // Clear previous views

            for (Map.Entry<String, Integer> entry : itemsPerSize.entrySet()) {
                TextView sizeTextView = (TextView) LayoutInflater.from(itemView.getContext()).inflate(
                        R.layout.size_item, // Layout for each size item
                        sizeContainer,
                        false
                );
                String sizeInfo = entry.getKey() + " - " + entry.getValue() + " item(s)";
                sizeTextView.setText(sizeInfo);
                sizeContainer.addView(sizeTextView);
            }
        }
    }

    public interface OnMoreButtonClickListener {
        void onMoreButtonClick(int position);

    }
}
