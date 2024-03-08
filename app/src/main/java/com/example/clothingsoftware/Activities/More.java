package com.example.clothingsoftware.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

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

            descriptionTextView.setText(String.format("Number of items: %s", description));
            titleTextView.setText(title);
            priceTextView.setText(String.format("Price: %s", price));

            if (itemsPerSize != null && !itemsPerSize.isEmpty()) {
                sizesTextView.setText(String.format("Size(s) - Number of items: %s", itemsPerSize));
            }

            String colorsString = colors != null ? "Color(s) (hexadecimal code): " + String.join(", ", colors) : "";
            colorsTextView.setText(colorsString);

            buttonBack.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    finish();
                }
            });
        }
    }
}
