package com.example.clothingsoftware.Fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.clothingsoftware.Adapters.FeedAdapter;
import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;

import java.util.ArrayList;

public class Feed extends Fragment {

    ArrayList<FeedModel> feedModels = new ArrayList<>();

    int[] postImage1 = {R.drawable.dime_shirt, R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt};

    int[] postImage2 = {R.drawable.dime_shirt, R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt};

    int[] postImage3 = {R.drawable.dime_shirt, R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt};

    int[] postImage4 = {R.drawable.dime_shirt, R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt,
            R.drawable.dime_shirt,R.drawable.dime_shirt};

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_feed, container, false);

        RecyclerView recyclerView = view.findViewById(R.id.recyclerViewFeed);
        setUpFeedModels();
        FeedAdapter adapter = new FeedAdapter(requireContext(), feedModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(requireContext()));
        return view;
    }

    private void setUpFeedModels() {
        String[] postName = getResources().getStringArray(R.array.feed_txt_name);
        String[] postPrice = getResources().getStringArray(R.array.feed_txt_price);
        String[] postSize = getResources().getStringArray(R.array.feed_txt_size);

        for (int i = 0; i < postName.length; i++) {
            feedModels.add(new FeedModel(postName[i], postPrice[i], postSize[i], postImage1[i],
                    postImage2[i], postImage3[i], postImage4[i]));
        }
    }
}
