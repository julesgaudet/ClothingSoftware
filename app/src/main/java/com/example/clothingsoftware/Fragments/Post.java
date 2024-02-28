package com.example.clothingsoftware.Fragments;

import android.os.Bundle;

import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Toast;

import com.example.clothingsoftware.R;
import com.google.android.material.textfield.TextInputLayout;

public class Post extends Fragment {

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
}

