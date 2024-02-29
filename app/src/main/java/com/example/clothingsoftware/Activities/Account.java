package com.example.clothingsoftware.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.app.Dialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.clothingsoftware.Fragments.Feed;
import com.example.clothingsoftware.Fragments.Orders;
import com.example.clothingsoftware.Fragments.Post;
import com.example.clothingsoftware.R;

import java.util.Objects;

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
    LinearLayout filterLayout;
    View shadowOverlay;
    String[] stateFeed = {"Lowest to highest price", "Highest to lowest price",
            "Recent to distant post", "Distant to recent post",
            "Less to most popular", "Most to less popular"};

    String[] stateOrders = {"Lowest to highest price", "Highest to lowest price",
            "Recent to distant order", "Distant to recent order",
            "Orders Finished", "Orders not finished"};
    AutoCompleteTextView autoCompleteTextViewFeed;
    ArrayAdapter<String> adapterItemsFeed;
    AutoCompleteTextView autoCompleteTextViewOrders;
    ArrayAdapter<String> adapterItemsOrders;

    // Verify if the "Search" or "More" menu is still open (prevent spam clicking)
    private boolean isDialogShowing = false;


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
        filterLayout = findViewById(R.id.filterLayout);

        // Initialize View for shadow
        shadowOverlay = findViewById(R.id.shadowOverlay);

        // Initialize Fragment
        ordersFragment = new Orders();
        feedFragment = new Feed();
        postFragment = new Post();

        // Initialize SwipeRefreshLayout
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        swipeRefreshLayout.setColorSchemeColors(ContextCompat.getColor(getApplicationContext(), R.color.colorPrimary));

        // Add color to the Feed icon and text
        displayFragment(new Feed());
        setIconAndTextColor(feedIcon, feedText, R.color.colorPrimary);


        // Add color to the icon and text and move to the Feed fragment
        feedLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayFragment(feedFragment);
                resetIconsAndText();
                setIconAndTextColor(feedIcon, feedText, R.color.colorPrimary);

            }
        });

        // Add color to the icon and text and move to the Post fragment
        postLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                resetIconsAndText();
                displayFragment(postFragment);
                swipeRefreshLayout.setEnabled(false);
                setIconAndTextColor(postIcon, postText, R.color.colorPrimary);

                searchLinearLayout.setVisibility(View.INVISIBLE);
            }
        });

        // Add color to the icon and text and move to the Orders fragment
        ordersLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayFragment(ordersFragment);
                resetIconsAndText();
                setIconAndTextColor(ordersIcon, ordersText, R.color.colorPrimary);

            }
        });

        // Refresh animation
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

        searchLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                shadowOverlayEffect(true);
                Fragment currentFragment = getSupportFragmentManager().findFragmentById(R.id.fragmentContainer);
                if (currentFragment != null) {
                    switch (currentFragment.getClass().getSimpleName()) {
                        case "Feed":
                            filterLayout.setEnabled(false);
                            showDialogFeedSearch();
                            break;
                        case "Orders":
                            filterLayout.setEnabled(false);
                            showDialogOrdersSearch();
                            break;
                    }
                }
            }
        });

        // The "More" menu with the Bottom Sheet Dialog
        filterLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                shadowOverlayEffect(true);
                Fragment currentFragment = getSupportFragmentManager().findFragmentById(R.id.fragmentContainer);
                if (currentFragment != null) {
                    switch (currentFragment.getClass().getSimpleName()) {
                        case "Feed":
                            filterLayout.setEnabled(false);
                            showDialogFeed();
                            break;
                        case "Post":
                            filterLayout.setEnabled(false);
                            showDialogPost();
                            break;
                        case "Orders":
                            filterLayout.setEnabled(false);
                            showDialogOrders();
                            break;
                    }
                }
            }
        });
    }

    // Show the Sheet Dialog for the Search in "Search Fragment"(when you click on Search icon)
    private void showDialogFeedSearch() {
        if (isDialogShowing) return; // Do nothing if the menu is open
        isDialogShowing = true;

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottom_sheet_layout_feed_search);

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                resetVariable();
            }
        });
        configureDialog(dialog);
    }

    // Show the Sheet Dialog for the Search in "Orders Fragment"(when you click on Search icon)
    private void showDialogOrdersSearch() {
        if (isDialogShowing) return; // Do nothing if the menu is open
        isDialogShowing = true;

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottom_sheet_layout_orders_search);

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                resetVariable();
            }
        });
        configureDialog(dialog);
    }

    // Show the Sheet Dialog for the more Menu of the Feed Fragment (menu when you click on More)
    private void showDialogFeed() {
        if (isDialogShowing) return; // Do nothing if the menu is open
        isDialogShowing = true;

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottom_sheet_layout_feed);

        // Retrieve views from the included layout
        autoCompleteTextViewFeed = dialog.findViewById(R.id.auto_complete_text1);

        // Set up adapters and other operations on the views here
        adapterItemsFeed = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, stateFeed);
        autoCompleteTextViewFeed.setAdapter(adapterItemsFeed);

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                resetVariable();
            }
        });
        configureDialog(dialog);
    }

    // Show the Sheet Dialog for the more Menu of the Orders Fragment (menu when you click on More)
    private void showDialogOrders() {
        if (isDialogShowing) return; // Do nothing if the menu is open
        isDialogShowing = true;

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottom_sheet_layout_orders);

        // Retrieve views from the included layout
        autoCompleteTextViewOrders = dialog.findViewById(R.id.auto_complete_text2);

        // Set up adapters and other operations on the views here
        adapterItemsOrders = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, stateOrders);
        autoCompleteTextViewOrders.setAdapter(adapterItemsOrders);

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                resetVariable();
            }
        });
        configureDialog(dialog);
    }


    // Show the Sheet Dialog for the feed Menu of the Post Fragment (menu when you click on More)
    private void showDialogPost() {
        if (isDialogShowing) return; // Do nothing if the menu is open
        isDialogShowing = true;

        final Dialog dialog = new Dialog(this);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setContentView(R.layout.bottom_sheet_layout_post);

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                resetVariable();
            }
        });
        configureDialog(dialog);
    }

    // Shadow effect when the Dialog Menu is clicked
    private void shadowOverlayEffect(boolean value) {
        if (value) {
            shadowOverlay.setVisibility(View.VISIBLE);
            shadowOverlay.animate().alpha(1f).setDuration(600).start();
        } else {
            shadowOverlay.animate().alpha(0f).setDuration(600).withEndAction(new Runnable() {
                @Override
                public void run() {
                    shadowOverlay.setVisibility(View.INVISIBLE);
                }
            }).start();
        }
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

    // Reset all parameters when exiting the menu
    private void resetVariable() {
        isDialogShowing = false;
        filterLayout.setEnabled(true);
        shadowOverlay.setVisibility(View.INVISIBLE);
        shadowOverlayEffect(false);
    }

    private void configureDialog(Dialog dialog) {
        dialog.show();
        Objects.requireNonNull(dialog.getWindow()).setLayout(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.getWindow().getAttributes().windowAnimations = R.style.DialogAnimation;
        dialog.getWindow().setGravity(Gravity.BOTTOM);
    }

    private void setIconAndTextColor(ImageView icon, TextView text, int color) {
        icon.setColorFilter(ContextCompat.getColor(getApplicationContext(), color));
        text.setTextColor(ContextCompat.getColor(getApplicationContext(), color));
    }
}