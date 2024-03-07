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

public class Feed extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_feed, container, false);

        ViewPager2 viewPager2 = view.findViewById(R.id.feedViewPager);

        List<FeedModel> feedItems = new ArrayList<>();

        FeedModel feedItem1 = new FeedModel();
        feedItem1.setImage1URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem1.setImage2URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem1.setImage3URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem1.setImage4URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem1.setTitle("Test124");
        feedItem1.setPrice("123");
        feedItem1.setSize("XL");

        FeedModel feedItem2 = new FeedModel();
        feedItem2.setImage1URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem2.setImage2URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem2.setImage3URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem2.setImage4URL("https://free-url-shortener.rb.gy/url-shortener.png");
        feedItem2.setTitle("Test125");
        feedItem2.setPrice("456");
        feedItem2.setSize("M");

        feedItems.add(feedItem1);
        feedItems.add(feedItem2);

        FeedAdapter feedAdapter = new FeedAdapter(feedItems);
        viewPager2.setAdapter(feedAdapter);

        return view;
    }
}
