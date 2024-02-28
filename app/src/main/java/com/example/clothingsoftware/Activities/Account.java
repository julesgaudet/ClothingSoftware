package com.example.clothingsoftware.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.clothingsoftware.Fragments.Feed;
import com.example.clothingsoftware.Fragments.Orders;
import com.example.clothingsoftware.Fragments.Post;
import com.example.clothingsoftware.R;

public class Account extends AppCompatActivity {

    LinearLayout feedLinearLayout;
    LinearLayout postLinearLayout;
    LinearLayout ordersLinearLayout;
    ImageView feedIcon;
    ImageView postIcon;
    ImageView ordersIcon;
    TextView feedText;
    TextView postText;
    TextView ordersText;
    Feed feedFragment;
    Orders ordersFragment;
    Post postFragment;
    SwipeRefreshLayout swipeRefreshLayout;
    LinearLayout searchLinearLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account);

        // Initialize views
        feedLinearLayout = findViewById(R.id.feedLinearLayout);
        postLinearLayout = findViewById(R.id.postLinearLayout);
        ordersLinearLayout = findViewById(R.id.ordersLinearLayout);
        feedIcon = findViewById(R.id.feedIcon);
        postIcon = findViewById(R.id.postIcon);
        ordersIcon = findViewById(R.id.ordersIcon);
        feedText = findViewById(R.id.feedText);
        postText = findViewById(R.id.postText);
        ordersText = findViewById(R.id.ordersText);
        searchLinearLayout = findViewById(R.id.searchLinearLayout);

        // Initialize Fragment
        ordersFragment = new Orders();
        feedFragment = new Feed();
        postFragment = new Post();

        // Initialize SwipeRefreshLayout
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        swipeRefreshLayout.setColorSchemeColors(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));

        // Add color to the Feed icon and text
        displayFragment(new Feed());
        feedIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
        feedText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));

        // Add color to the icon and text and move to the Feed fragment
        feedLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayFragment(feedFragment);
                resetIconsAndText();
                feedIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
                feedText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
            }
        });

        // Add color to the icon and text and move to the Post fragment
        postLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                resetIconsAndText();
                displayFragment(postFragment);
                swipeRefreshLayout.setEnabled(false);
                postIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
                postText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
                searchLinearLayout.setVisibility(View.INVISIBLE);
            }
        });

        // Add color to the icon and text and move to the Orders fragment
        ordersLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayFragment(ordersFragment);
                resetIconsAndText();
                ordersIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
                ordersText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));
            }
        });

        // À IMPLÉMENTER PLUS TARD; il serait utile pour refresh le contenu.
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                // Stop refresh animation after 3 seconds
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        swipeRefreshLayout.setRefreshing(false);
                    }
                }, 1000);
            }
        });
    }

    // Reset the base color of the icons and footer text
    private void resetIconsAndText() {
        ordersIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));
        feedIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));
        postIcon.setColorFilter(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));

        ordersText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));
        feedText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));
        postText.setTextColor(ContextCompat.getColor(getApplicationContext(), R.color.colorSecondPrimary));
        searchLinearLayout.setVisibility(View.VISIBLE);
        swipeRefreshLayout.setEnabled(true);
    }

    // Change the fragment for the specific fragment
    private void displayFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.fragmentContainer, fragment);
        transaction.addToBackStack(null);
        transaction.commit();
    }
}