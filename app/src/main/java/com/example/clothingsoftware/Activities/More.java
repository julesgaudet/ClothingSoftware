package com.example.clothingsoftware.Activities;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.example.clothingsoftware.Class.FeedManager;
import com.example.clothingsoftware.R;

import java.util.ArrayList;

public class More extends AppCompatActivity {

    private FeedManager feedManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_more);

        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
            String title = bundle.getString("title");
            String price = bundle.getString("price");
            String itemsPerSize = bundle.getString("itemsPerSize");
            ArrayList<String> colors = bundle.getStringArrayList("colors");
            String description = bundle.getString("description");
            String brand = bundle.getString("brand");

            TextView titleTextView = findViewById(R.id.titleTextView);
            TextView priceTextView = findViewById(R.id.priceTextView);
            TextView sizesTextView = findViewById(R.id.sizesTextView);
            TextView colorsTextView = findViewById(R.id.colorsTextView);
            Button buttonBack = findViewById(R.id.buttonBack);
            TextView descriptionTextView = findViewById(R.id.descriptionTextView);
            TextView brandTextView = findViewById(R.id.brandTextView);
            Button buttonDelete = findViewById(R.id.buttonDelete);
            View shadowOverlay = findViewById(R.id.shadowOverlay);

            feedManager = new FeedManager(this, buttonDelete);
            feedManager.checkArticleAssociation(title);

            titleTextView.setText(title);
            // Set bold for specific parts of text
            setBoldColorText(priceTextView, "Price: " + price, "Price", ContextCompat.getColor(this, R.color.black));
            if (itemsPerSize != null && !itemsPerSize.isEmpty()) {
                setBoldColorText(sizesTextView, "Size(s) - Number of items: " + itemsPerSize, "Size(s) - Number of items", ContextCompat.getColor(this, R.color.black));
            }
            setBoldColorText(colorsTextView, "Color(s) (hexadecimal code): " + (colors != null ? String.join(", ", colors) : ""), "Color(s) (hexadecimal code)", ContextCompat.getColor(this, R.color.black));
            setBoldColorText(descriptionTextView, "Description: " + description, "Description",  ContextCompat.getColor(this, R.color.black));
            setBoldColorText(brandTextView, "Brand: " + brand, "Brand", ContextCompat.getColor(this, R.color.black));

            buttonBack.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    finish();
                }
            });

            buttonDelete.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    shadowOverlay.setVisibility(View.VISIBLE);
                    shadowOverlay.animate().alpha(1f).setDuration(600).start();

                    AlertDialog.Builder builder = new AlertDialog.Builder(More.this);
                    builder.setTitle("Delete Article");
                    builder.setMessage("Are you sure you want to delete the article?");
                    builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                            feedManager.deleteArticle(title);
                            shadowOverlay.animate().alpha(0f).setDuration(600).withEndAction(new Runnable() {
                                @Override
                                public void run() {
                                    shadowOverlay.setVisibility(View.INVISIBLE);
                                }
                            }).start();
                            Intent intent = new Intent(More.this, Account.class);
                            startActivity(intent);
                        }
                    });
                    builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                            shadowOverlay.animate().alpha(0f).setDuration(600).withEndAction(new Runnable() {
                                @Override
                                public void run() {
                                    shadowOverlay.setVisibility(View.INVISIBLE);
                                }
                            }).start();
                        }
                    });
                    AlertDialog alertDialog = builder.create();
                    alertDialog.show();
                }
            });
        }
    }

    public static void setBoldColorText(TextView textView, String fullText, String coloredBoldText, int color) {
        textView.setText(fullText, TextView.BufferType.SPANNABLE);
        android.text.Spannable spannable = (android.text.Spannable) textView.getText();
        int start = fullText.indexOf(coloredBoldText);
        int end = start + coloredBoldText.length();
        spannable.setSpan(new android.text.style.StyleSpan(android.graphics.Typeface.BOLD), start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        spannable.setSpan(new android.text.style.ForegroundColorSpan(color), start, end, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
    }
}
