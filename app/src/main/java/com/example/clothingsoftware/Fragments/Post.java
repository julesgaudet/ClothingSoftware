package com.example.clothingsoftware.Fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.clothingsoftware.R;
import com.example.clothingsoftware.Utils.TextUtils;

public class Post extends Fragment {

    Button buttonPost;
    String[] item = {"T-shirt", "Pants", "Jeans", "Dress", "Coat", "Shorts", "Jacket", "Jumpsuit", "Skirt", "Blouse", "Sweater", "Hoodie", "Suit", "Tie", "Blazer", "Leggings", "Tank top", "Cardigan", "Polo shirt", "Sweatshirt", "Romper"};
    AutoCompleteTextView autoCompleteTextView;
    ArrayAdapter<String> adapterItems;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_post, container, false);

        autoCompleteTextView = view.findViewById(R.id.auto_complete_text);

        // Initialize adapter with the context and the layout for each item
        adapterItems = new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, item);

        // Set the adapter to the AutoCompleteTextView
        autoCompleteTextView.setAdapter(adapterItems);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Button buttonPost = view.findViewById(R.id.buttonPost);
        AutoCompleteTextView autoCompleteTextView = view.findViewById(R.id.auto_complete_text);

        buttonPost.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        TextView articleName = view.findViewById(R.id.articleNameEditText);
                        TextView price = view.findViewById(R.id.priceEditText);
                        TextView description = view.findViewById(R.id.descriptionEditText);


                        String stringArticleName = TextUtils.sanitizeInput(articleName.getText().toString().trim());
                        String stringPrice = TextUtils.sanitizeInput(price.getText().toString().trim());
                        String stringDescription = TextUtils.sanitizeInput(description.getText().toString().trim());

                // Verify if the fields are not empty
                if (stringArticleName.isEmpty() || stringPrice.isEmpty() || stringDescription.isEmpty()) {
                    Toast.makeText(getContext(), "Fill out all the fields", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Verify if an item is selected in the AutoCompleteTextView
                if (autoCompleteTextView.getText().toString().isEmpty()) {
                    Toast.makeText(getContext(), "Select an item from the list", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Reset AutoCompleteTextView
                autoCompleteTextView.setText("");

                // Reset other fields
                articleName.setText("");
                price.setText("");
                description.setText("");

                Toast.makeText(getContext(), "Article posted successfully", Toast.LENGTH_SHORT).show();
            }
        });
    }
}

