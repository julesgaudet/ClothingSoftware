package com.example.clothingsoftware.Class;

import android.util.Patterns;

public class AccountValidator {
    public static boolean isValidEmail(CharSequence target) {
        return Patterns.EMAIL_ADDRESS.matcher(target).matches();
    }

    public static boolean isValidPassword(CharSequence password) {
        if (password.length() < 8) {
            return false;
        }

        boolean hasDigit = false;
        boolean hasUppercase = false;
        boolean hasLowercase = false;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isDigit(ch)) {
                hasDigit = true;
            } else if (Character.isUpperCase(ch)) {
                hasUppercase = true;
            } else if (Character.isLowerCase(ch)) {
                hasLowercase = true;
            }
        }
        return hasDigit && hasUppercase && hasLowercase;
    }

    public static boolean isValidUsername(CharSequence username) {
        if (username.length() < 6) {
            return false;
        }
        return username.toString().matches("^[a-zA-Z0-9]*$");
    }
}