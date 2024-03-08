package com.example.clothingsoftware.Fragments;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.clothingsoftware.Adapters.FeedAdapter;
import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

public class Feed extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_feed, container, false);

        ViewPager2 viewPager2 = view.findViewById(R.id.feedViewPager);

        List<FeedModel> feedItems = new ArrayList<>();

        FeedModel feedItem1 = new FeedModel();
        feedItem1.setTitle("T-Shirt");
        feedItem1.setPrice("125$");
        feedItem1.setSizes(Arrays.asList("S", "M", "L"));
        feedItem1.setColors(Arrays.asList("#345432", "#222000", "#111444"));
        feedItem1.setImageUrls(Arrays.asList(
                "https://image-url-1.jpg",
                "https://image-url-2.jpg",
                "https://image-url-3.jpg",
                "https://image-url-4.jpg"));

        FeedModel feedItem2 = new FeedModel();
        feedItem2.setTitle("Weird yellow shirt");
        feedItem2.setPrice("222$");
        feedItem2.setSizes(Arrays.asList("XL", "XLL"));
        feedItem2.setColors(Arrays.asList("#345432", "#222000", "#000111"));
        feedItem2.setImageUrls(Arrays.asList(
                "https://image-url-5.jpg",
                "https://image-url-6.jpg",
                "https://image-url-7.jpg",
                "https://image-url-8.jpg"));

        feedItems.add(feedItem1);
        feedItems.add(feedItem2);

        FeedAdapter feedAdapter = new FeedAdapter(feedItems);
        viewPager2.setAdapter(feedAdapter);

        return view;
    }
}
