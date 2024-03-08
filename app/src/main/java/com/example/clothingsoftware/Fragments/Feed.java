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
        feedItem1.setTitle("Enchanté T-Shirt ");
        feedItem1.setPrice("125$");
        feedItem1.setSizes(Arrays.asList("S", "M", "L"));
        feedItem1.setColors(Arrays.asList("#345432", "#222000", "#111444"));
        feedItem1.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        feedItems.add(feedItem1);

        FeedModel feedItem2 = new FeedModel();
        feedItem2.setTitle("Enchanté T-Shirt ");
        feedItem2.setPrice("125$");
        feedItem2.setSizes(Arrays.asList("XXXS", "XXS", "S", "M", "L", "XL", "XXL","XXXL"));
        feedItem2.setColors(Arrays.asList("#245434", "#222020", "#211444"));
        feedItem2.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        feedItems.add(feedItem2);

        FeedModel feedItem3 = new FeedModel();
        feedItem3.setTitle("Enchanté T-Shirt ");
        feedItem3.setPrice("125$");
        feedItem3.setSizes(Arrays.asList("S", "M", "L"));
        feedItem3.setColors(Arrays.asList("#145437", "#222040", "#311444"));
        feedItem3.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        feedItems.add(feedItem3);

        FeedModel feedItem4 = new FeedModel();
        feedItem4.setTitle("Enchanté T-Shirt ");
        feedItem4.setPrice("125$");
        feedItem4.setSizes(Arrays.asList("S", "M", "L"));
        feedItem4.setColors(Arrays.asList("#045439", "#222060", "#411444"));
        feedItem4.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        feedItems.add(feedItem4);

        FeedModel feedItem5 = new FeedModel();
        feedItem5.setTitle("Enchanté T-Shirt ");
        feedItem5.setPrice("125$");
        feedItem5.setSizes(Arrays.asList("S", "M", "L"));
        feedItem5.setColors(Arrays.asList("#345470", "#222080", "#511444"));
        feedItem5.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        feedItems.add(feedItem5);

        FeedModel feedItem6 = new FeedModel();
        feedItem6.setTitle("Enchanté T-Shirt ");
        feedItem6.setPrice("125$");
        feedItem6.setSizes(Arrays.asList("S", "M", "L"));
        feedItem6.setColors(Arrays.asList("#345432", "#222100", "#611444"));
        feedItem6.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        feedItems.add(feedItem6);

        FeedModel feedItem7 = new FeedModel();
        feedItem7.setTitle("Enchanté T-Shirt ");
        feedItem7.setPrice("125$");
        feedItem7.setSizes(Arrays.asList("S", "M", "L"));
        feedItem7.setColors(Arrays.asList("#345432", "#222120", "#711444"));
        feedItem7.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        feedItems.add(feedItem7);

        FeedModel feedItem8 = new FeedModel();
        feedItem8.setTitle("Enchanté T-Shirt ");
        feedItem8.setPrice("125$");
        feedItem8.setSizes(Arrays.asList("S", "M", "L"));
        feedItem8.setColors(Arrays.asList("#345432", "#222140", "#811444"));
        feedItem8.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        feedItems.add(feedItem8);

        FeedModel feedItem9 = new FeedModel();
        feedItem9.setTitle("Enchanté T-Shirt ");
        feedItem9.setPrice("125$");
        feedItem9.setSizes(Arrays.asList("S", "M", "L"));
        feedItem9.setColors(Arrays.asList("#345432", "#222160", "#911444"));
        feedItem9.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        feedItems.add(feedItem9);

        FeedModel feedItem10 = new FeedModel();
        feedItem10.setTitle("Enchanté T-Shirt ");
        feedItem10.setPrice("125$");
        feedItem10.setSizes(Arrays.asList("S", "M", "L"));
        feedItem10.setColors(Arrays.asList("#345432", "#222180", "#A11444"));
        feedItem10.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        feedItems.add(feedItem10);

        FeedAdapter feedAdapter = new FeedAdapter(feedItems);
        viewPager2.setAdapter(feedAdapter);

        return view;
    }
}
