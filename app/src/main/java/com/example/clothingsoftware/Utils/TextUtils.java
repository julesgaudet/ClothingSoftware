package com.example.clothingsoftware.Utils;

import android.graphics.Typeface;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.ForegroundColorSpan;
import android.text.style.StyleSpan;
import android.widget.TextView;

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
}