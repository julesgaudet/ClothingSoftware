package com.example.clothingsoftware.Fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.text.InputType;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.content.ContextCompat;
import com.example.clothingsoftware.R;
import com.example.clothingsoftware.Utils.TextUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Post extends Fragment {
    String[] item = {"T-shirt", "Pants", "Jeans", "Dress", "Coat", "Shorts", "Jacket", "Jumpsuit", "Skirt", "Blouse", "Sweater", "Hoodie", "Suit", "Tie", "Blazer", "Leggings", "Tank top", "Cardigan", "Polo shirt", "Sweatshirt", "Romper"};
    String[] numberOfImage = {"1","2","3","4"};
    String[] numberOfSize = {"1","2","3","4", "5", "6"};
    AutoCompleteTextView autoCompleteTextView;
    ArrayAdapter<String> adapterItems;
    AutoCompleteTextView autoCompleteTextViewImage;
    ArrayAdapter<String> adapterItemsImage;
    AutoCompleteTextView autoCompleteTextViewSize;
    ArrayAdapter<String> adapterItemsSize;
    LinearLayout linearLayoutImage;
    LinearLayout linearLayoutSize;
    private final List<EditText> editTextListImage = new ArrayList<>();
    private final List<EditText> editTextListSize = new ArrayList<>();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_post, container, false);

        autoCompleteTextView = view.findViewById(R.id.auto_complete_text);
        autoCompleteTextViewImage = view.findViewById(R.id.auto_complete_text_add_image);
        autoCompleteTextViewSize = view.findViewById(R.id.auto_complete_text_add_type);
        linearLayoutImage = view.findViewById(R.id.layoutforNewImage);
        linearLayoutSize = view.findViewById(R.id.layoutforNewSize);

        // Initialize adapter with the context and the layout for each item
        adapterItems = new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, item);
        adapterItemsImage = new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, numberOfImage);
        adapterItemsSize = new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, numberOfSize);

        // Set the adapter to the AutoCompleteTextView
        autoCompleteTextView.setAdapter(adapterItems);
        autoCompleteTextViewImage.setAdapter(adapterItemsImage);
        autoCompleteTextViewSize.setAdapter(adapterItemsSize);

        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Button buttonPost = view.findViewById(R.id.buttonPost);
        autoCompleteTextView = view.findViewById(R.id.auto_complete_text);

        buttonPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView articleName = view.findViewById(R.id.articleNameEditText);
                TextView price = view.findViewById(R.id.priceEditText);
                TextView description = view.findViewById(R.id.descriptionEditText);

                validateAndResetFields(articleName, price, description);
            }
        });

        // Create EditText for image URLs based on selected number
        autoCompleteTextViewImage.setOnItemClickListener((parent, view1, position, id) -> {
            int numberOfImages = Integer.parseInt(Objects.requireNonNull(adapterItemsImage.getItem(position)));
            createEditTextsForImages(numberOfImages);
        });

        // Create EditText for Size based on selected number
        autoCompleteTextViewSize.setOnItemClickListener((parent, view1, position, id) -> {
            int numberOfSizes = Integer.parseInt(Objects.requireNonNull(adapterItemsSize.getItem(position)));
            createEditTextsForSizes(numberOfSizes);
        });
    }

    private void createEditTextsForImages(int numberOfImages) {
        linearLayoutImage.removeAllViews();
        editTextListImage.clear();

        createEditTextForImage("Image " + 1 + " URL (Primary Picture");
        for (int i = 2; i < numberOfImages + 1; i++) {
            createEditTextForImage("Image " + i + " URL");
        }
    }

    private void createEditTextsForSizes(int numberOfSizes) {
        linearLayoutSize.removeAllViews();
        editTextListSize.clear();

        for (int i = 1; i <= numberOfSizes; i++) {
            createEditTextForSize("Size " + i);
        }
    }

    private void createEditTextForImage(String hint) {
        EditText editText = new EditText(requireContext());

        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        layoutParams.setMargins(0, 70, 0, 0);
        editText.setLayoutParams(layoutParams);
        editText.setHint(hint);
        editText.setTextColor(ContextCompat.getColor(requireContext(), R.color.black));
        editText.setHintTextColor(ContextCompat.getColor(requireContext(), R.color.colorSecondPrimary));
        editText.setInputType(InputType.TYPE_CLASS_TEXT);
        editText.setBackground(ContextCompat.getDrawable(requireContext(), R.drawable.input_border));
        editText.setPadding(50, 45, 0, 45);
        editText.setTextSize(16);
        editText.setMinHeight(48);

        // Adding the EditText to the list
        editTextListImage.add(editText);

        // Adding EditText to parent layout
        linearLayoutImage.addView(editText);
    }

    private void createEditTextForSize(String hint1) {
        // Create a horizontal LinearLayout to contain the two EditText
        LinearLayout linearLayout = new LinearLayout(requireContext());
        linearLayout.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        linearLayout.setOrientation(LinearLayout.HORIZONTAL);
        linearLayout.setGravity(Gravity.CENTER_VERTICAL);
        linearLayout.setPadding(0, 70, 0, 0);

        // Create the first EditText
        EditText editText1 = createEditTextWithParams(hint1);
        editText1.setLayoutParams(new LinearLayout.LayoutParams(
                0,
                LinearLayout.LayoutParams.WRAP_CONTENT,
                1
        ));

        // Create the second EditText
        EditText editText2 = createEditTextWithParams("Number of Items");
        LinearLayout.LayoutParams paramsEditText2 = new LinearLayout.LayoutParams(
                0,
                LinearLayout.LayoutParams.WRAP_CONTENT,
                1
        );
        paramsEditText2.setMargins(20, 0, 0, 0); // Add margin between the two EditText
        editText2.setLayoutParams(paramsEditText2);

        // Add the EditTexts to the LinearLayout
        linearLayout.addView(editText1);
        linearLayout.addView(editText2);

        // Adding the LinearLayout to the parent layout
        linearLayoutSize.addView(linearLayout);
    }

    private EditText createEditTextWithParams(String hint) {
        EditText editText = new EditText(requireContext());
        editText.setHint(hint);
        editText.setGravity(Gravity.CENTER);
        editText.setTextColor(ContextCompat.getColor(requireContext(), R.color.black));
        editText.setHintTextColor(ContextCompat.getColor(requireContext(), R.color.colorSecondPrimary));
        editText.setInputType(InputType.TYPE_CLASS_TEXT);
        editText.setBackground(ContextCompat.getDrawable(requireContext(), R.drawable.input_border));
        editText.setPadding(0, 45, 0, 45);
        editText.setTextSize(16);
        editText.setMinHeight(48);
        return editText;
    }


    private void validateAndResetFields(TextView articleName, TextView price, TextView description) {
        // Extract input from TextViews
        String stringArticleName = TextUtils.sanitizeInput(articleName.getText().toString().trim());
        String stringPrice = TextUtils.sanitizeInput(price.getText().toString().trim());
        String stringDescription = TextUtils.sanitizeInput(description.getText().toString().trim());

        // Verify if any required field is empty
        if (isAnyFieldEmpty(stringArticleName, stringPrice, stringDescription)) {
            Toast.makeText(getContext(), "Please fill out all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Validate medium input length for description
        if (!isMediumInputLength(stringDescription)) {
            Toast.makeText(getContext(), "Description length is too long", Toast.LENGTH_SHORT).show();
            return;
        }

        // Validate sizes and number of items
        if (!validateSizesAndItems()) {
            return;
        }

        // Validate image URLs
        if (!validateImageUrls()) {
            return;
        }

        // Reset all fields if the post is accepted
        resetFields();

        // Display success message
        Toast.makeText(getContext(), "New post successful", Toast.LENGTH_SHORT).show();
    }

    private boolean isAnyFieldEmpty(String articleName, String price, String description) {
        return articleName.isEmpty() || price.isEmpty() || description.isEmpty() ||
                autoCompleteTextView.getText().toString().isEmpty() ||
                autoCompleteTextViewImage.getText().toString().isEmpty() ||
                autoCompleteTextViewSize.getText().toString().isEmpty();
    }

    private boolean isMediumInputLength(String input) {
        return input.length() <= 200;
    }

    private boolean validateSizesAndItems() {
        for (int i = 0; i < linearLayoutSize.getChildCount(); i++) {
            LinearLayout linearLayout = (LinearLayout) linearLayoutSize.getChildAt(i);
            EditText editText1 = (EditText) linearLayout.getChildAt(0);
            EditText editText2 = (EditText) linearLayout.getChildAt(1);

            String editText1Text = editText1.getText().toString().trim();
            String editText2Text = editText2.getText().toString().trim();

            if (editText1Text.isEmpty() || editText2Text.isEmpty()) {
                Toast.makeText(getContext(), "Please enter a value for each size", Toast.LENGTH_SHORT).show();
                return false;
            } else {
                try {
                    double editText2Value = Double.parseDouble(editText2Text);
                } catch (NumberFormatException e) {
                    Toast.makeText(getContext(), "Number of items must be a number", Toast.LENGTH_SHORT).show();
                    return false;
                }
            }
        }
        return true;
    }

    private boolean validateImageUrls() {
        for (EditText editText : editTextListImage) {
            String imageUrl = editText.getText().toString().trim();
            if (imageUrl.isEmpty()) {
                Toast.makeText(getContext(), "Please enter URL for all images", Toast.LENGTH_SHORT).show();
                return false;
            }
            if (!TextUtils.isValidUrl(imageUrl)) {
                Toast.makeText(getContext(), "Please enter a valid URL for all images", Toast.LENGTH_SHORT).show();
                return false;
            }
        }
        return true;
    }

    private void resetFields() {
        TextView articleName = requireView().findViewById(R.id.articleNameEditText);
        TextView price = requireView().findViewById(R.id.priceEditText);
        TextView description = requireView().findViewById(R.id.descriptionEditText);

        articleName.setText("");
        price.setText("");
        description.setText("");
        autoCompleteTextView.setText("");
        autoCompleteTextViewImage.setText("");
        autoCompleteTextViewSize.setText("");

        for (EditText editText : editTextListSize) {
            editText.setText("");
        }

        for (EditText editText : editTextListImage) {
            editText.setText("");
        }

        linearLayoutImage.removeAllViews();
        linearLayoutSize.removeAllViews();
    }
}