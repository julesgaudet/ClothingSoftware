package com.example.clothingsoftware.Fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.clothingsoftware.Activities.More;
import com.example.clothingsoftware.Adapters.FeedAdapter;
import com.example.clothingsoftware.Class.FeedManager;
import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Feed extends Fragment implements FeedAdapter.OnMoreButtonClickListener {

    private List<FeedModel> feedItems;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_feed, container, false);

        ViewPager2 viewPager2 = view.findViewById(R.id.feedViewPager);
        feedItems = new ArrayList<>();
        FeedAdapter feedAdapter = new FeedAdapter(feedItems);
        viewPager2.setAdapter(feedAdapter);
        feedAdapter.setOnMoreButtonClickListener(this);

        FeedManager feedManager = new FeedManager(getContext());
        feedManager.getAllArticles(feedAdapter, this);

        return view;
    }

    @Override
    public void onMoreButtonClick(int position) {
        FeedModel feedItem = feedItems.get(position);
        Bundle bundle = new Bundle();
        bundle.putString("title", feedItem.getTitle());
        bundle.putString("price", feedItem.getPrice());
        bundle.putString("description", feedItem.getDescription());
        bundle.putString("brand", feedItem.getBrand());

        Map<String, Integer> itemsPerSize = feedItem.getItemsPerSize();
        if (itemsPerSize != null && !itemsPerSize.isEmpty()) {
            StringBuilder sizesStringBuilder = new StringBuilder();
            for (Map.Entry<String, Integer> entry : itemsPerSize.entrySet()) {
                sizesStringBuilder.append(entry.getKey()).append(": ").append(entry.getValue()).append(", ");
            }
            sizesStringBuilder.delete(sizesStringBuilder.length() - 2, sizesStringBuilder.length());
            bundle.putString("itemsPerSize", sizesStringBuilder.toString());
        }
        bundle.putStringArrayList("colors", new ArrayList<>(feedItem.getColors()));
        Intent intent = new Intent(getActivity(), More.class);
        intent.putExtras(bundle);
        startActivity(intent);
    }
}
