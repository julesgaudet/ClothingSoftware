package com.example.clothingsoftware.Activities;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.StyleSpan;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.clothingsoftware.R;

public class MoreOrder extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_more_order);

        // Retrieve order data from the intent
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            String orderCode = extras.getString("ORDER_CODE");
            String clientAddress = extras.getString("CLIENT_ADDRESS");
            String orderDate = extras.getString("ORDER_DATE");
            String clientEmail = extras.getString("CLIENT_EMAIL");
            String clientFirstName = extras.getString("CLIENT_FIRST_NAME");
            String clientLastName = extras.getString("CLIENT_LAST_NAME");
            String clientCity = extras.getString("CLIENT_CITY");
            String clientRegionState = extras.getString("CLIENT_REGION_STATE");
            String clientCountry = extras.getString("CLIENT_COUNTRY");
            String clientZipCode = extras.getString("CLIENT_ZIP_CODE");
            String orderPaymentOption = extras.getString("ORDER_PAYMENT_OPTION");

            // Update views with order data
            TextView orderCodeTextView = findViewById(R.id.clientOrderCodeTextView);
            orderCodeTextView.setText(getStyledText("Order Code: ", orderCode));

            TextView clientAddressTextView = findViewById(R.id.clientAddressTextView);
            clientAddressTextView.setText(getStyledText("Client Address: ", clientAddress));

            TextView orderDateTextView = findViewById(R.id.clientOrderDateTextView);
            orderDateTextView.setText(getStyledText("Order Date: ", orderDate));

            TextView orderPaymentOptionTextView = findViewById(R.id.clientPaymentOptionTextView);
            orderPaymentOptionTextView.setText(getStyledText("Payment Option: ", orderPaymentOption));

            // Update other views with client data
            TextView clientFirstNameTextView = findViewById(R.id.clientFirstNameTextView);
            clientFirstNameTextView.setText(getStyledText("First Name: ", clientFirstName));

            TextView clientLastNameTextView = findViewById(R.id.clientLastNameTextView);
            clientLastNameTextView.setText(getStyledText("Last Name: ", clientLastName));

            TextView clientEmailTextView = findViewById(R.id.clientEmailTextView);
            clientEmailTextView.setText(getStyledText("Email: ", clientEmail));

            TextView clientCityTextView = findViewById(R.id.clientCityTextView);
            clientCityTextView.setText(getStyledText("City: ", clientCity));

            TextView clientRegionStateTextView = findViewById(R.id.clientRegionStateTextView);
            clientRegionStateTextView.setText(getStyledText("Region/State: ", clientRegionState));

            TextView clientCountryTextView = findViewById(R.id.clientCountryTextView);
            clientCountryTextView.setText(getStyledText("Country: ", clientCountry));

            TextView clientZipCodeTextView = findViewById(R.id.clientZipCodeTextView);
            clientZipCodeTextView.setText(getStyledText("Zip Code: ", clientZipCode));
        }


        // Set up click listener for back button
        ImageView backIcon = findViewById(R.id.backIconImageView);
        backIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    // Method to style the text
    private SpannableString getStyledText(String label, String value) {
        SpannableString styledText = new SpannableString(label + value);
        styledText.setSpan(new StyleSpan(android.graphics.Typeface.BOLD), 0, label.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return styledText;
    }
}
