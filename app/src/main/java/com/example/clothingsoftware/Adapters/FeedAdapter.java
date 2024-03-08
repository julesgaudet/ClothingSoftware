package com.example.clothingsoftware.Adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;

import java.util.ArrayList;
import java.util.List;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.FeedViewHolder>{

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
    }

    static class FeedViewHolder extends RecyclerView.ViewHolder {

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
            size.setText(feedModel.getSize());

            List<String> imageUrls = new ArrayList<>();
            imageUrls.add(feedModel.getImage1URL());
            imageUrls.add(feedModel.getImage2URL());
            imageUrls.add(feedModel.getImage3URL());
            imageUrls.add(feedModel.getImage4URL());

            ImagePagerAdapter adapter = new ImagePagerAdapter(imageUrls);
            imageContainer.setAdapter(adapter);
        }
    }
}

