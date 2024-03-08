package com.example.clothingsoftware.Activities;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.example.clothingsoftware.R;

import java.util.ArrayList;

public class More extends AppCompatActivity {

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

            TextView titleTextView = findViewById(R.id.titleTextView);
            TextView priceTextView = findViewById(R.id.priceTextView);
            TextView sizesTextView = findViewById(R.id.sizesTextView);
            TextView colorsTextView = findViewById(R.id.colorsTextView);
            Button buttonBack = findViewById(R.id.buttonBack);
            TextView descriptionTextView = findViewById(R.id.descriptionTextView);


            titleTextView.setText(title);
            // Set bold for specific parts of text
            setBoldColorText(priceTextView, "Price: " + price, "Price", ContextCompat.getColor(this, R.color.black));
            if (itemsPerSize != null && !itemsPerSize.isEmpty()) {
                setBoldColorText(sizesTextView, "Size(s) - Number of items: " + itemsPerSize, "Size(s) - Number of items", ContextCompat.getColor(this, R.color.black));
            }
            setBoldColorText(colorsTextView, "Color(s) (hexadecimal code): " + (colors != null ? String.join(", ", colors) : ""), "Color(s) (hexadecimal code)", ContextCompat.getColor(this, R.color.black));
            setBoldColorText(descriptionTextView, "Description: " + description, "Description",  ContextCompat.getColor(this, R.color.black));

            buttonBack.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    finish();
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
