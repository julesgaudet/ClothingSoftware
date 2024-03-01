package com.example.clothingsoftware.Utils;

import android.graphics.Typeface;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.ForegroundColorSpan;
import android.text.style.StyleSpan;
import android.widget.TextView;

import java.util.regex.Pattern;

public class TextUtils {

    //This function takes a complete sentence, the part to be bolded and the color of the part to be bolded
    public static void setBoldColorText(TextView textView, String fullText, String coloredBoldText, int color) {
        SpannableString spannableString = new SpannableString(fullText);

        int startIndex = fullText.indexOf(coloredBoldText);
        int endIndex = startIndex + coloredBoldText.length();

        StyleSpan boldSpan = new StyleSpan(Typeface.BOLD);
        spannableString.setSpan(boldSpan, startIndex, endIndex, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        ForegroundColorSpan colorSpan = new ForegroundColorSpan(color);
        spannableString.setSpan(colorSpan, startIndex, endIndex, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

        textView.setText(spannableString);
    }

    // Counter for injections
    public static String sanitizeInput(String input) {
        String[] dangerousChars = {"<", ">", "'", "\"", ";", "(", ")", "&", "$", "|", "`", "\\", "/", "%", "#", "{", "}", "[", "]", "=", "*", "+", "^", "~", ":"};

        for (String dangerousChar : dangerousChars) {
            if (input.contains(dangerousChar)) {
                input = input.replace(dangerousChar, "");
            }
        }
        return input;
    }

    // Verify that the url is valid
    public static boolean isValidUrl(String url) {
        // Pattern pour vérifier les URL
        String urlPattern = "^((https?|ftp|file)://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(/[a-zA-Z0-9-._?,'+=&%$]*)?$";
        return Pattern.matches(urlPattern, url);
    }

    // Verify that it's less than 200 characters
    public static boolean numberOfCharacterBigInput(String input) {
        return input.length() <= 200;
    }

    // Verify that it's less than 30 characters
    public static boolean numberOfCharacterMediumInput(String input) {
        return input.length() <= 30;
    }

    // Verify that it's less than 10 characters
    public static boolean numberOfCharacterSmallInput(String input) {
        return input.length() <= 30;
    }
}