package com.example.clothingsoftware.Activities;

import static com.example.clothingsoftware.Utils.TextUtils.setBoldColorText;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.clothingsoftware.Class.AccountValidator;
import com.example.clothingsoftware.R;

public class Signup extends AppCompatActivity {
    EditText signupPassword;
    EditText signupPassword2;
    EditText signupUsername;
    EditText signupEmail;
    Button button;
    ImageView goBackIcon;
    TextView linkTermsOfUse;

    //TODO
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // Initialize views
        signupPassword = findViewById(R.id.signupPassword);
        signupPassword2 = findViewById(R.id.signupPassword2);
        signupUsername = findViewById(R.id.signupUsername);
        signupEmail = findViewById(R.id.signupEmail);
        button = findViewById(R.id.button);
        progressBar = findViewById(R.id.progressbar);
        goBackIcon = findViewById(R.id.goBackIcon);
        linkTermsOfUse = findViewById(R.id.linkTermsOfUse);

        //Put the link in bold for the conditions of use
        setBoldColorText(linkTermsOfUse, "By continuing, you agree to Our Terms of Use", "Terms of Use", R.color.colorPrimary);

        goBackIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Signup.this, Login.class);
                startActivity(intent);
                finish();
            }
        });

        // Set up text change listener for enabling/disabling button
        signupEmail.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    updateButtonState();
                    String email = signupEmail.getText().toString();
                    if (!AccountValidator.isValidEmail(email) && !(email.isEmpty())) {
                        Toast.makeText(Signup.this, "Invalid email address", Toast.LENGTH_SHORT).show();
                        signupEmail.setBackgroundResource(R.drawable.input_error);
                    } else {
                        signupEmail.setBackgroundResource(R.drawable.input_border);
                    }
                }
            }
        });

        // Set up text change listener for enabling/disabling button
        signupPassword.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    updateButtonState();
                    String password = signupPassword.getText().toString();
                    if (!AccountValidator.isValidPassword(password) && !(password.isEmpty())) {
                        Toast.makeText(Signup.this, "Password must be at least 8 characters long, one uppercase letter and one digit", Toast.LENGTH_SHORT).show();
                        signupPassword.setBackgroundResource(R.drawable.input_error);
                    } else {
                        signupPassword.setBackgroundResource(R.drawable.input_border);
                    }
                }
            }
        });

        // Set up text change listener for enabling/disabling button
        signupPassword2.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    updateButtonState();
                    String confirmPassword = signupPassword2.getText().toString();
                    if (!confirmPassword.equals(signupPassword.getText().toString()) && !(confirmPassword.isEmpty())) {
                        Toast.makeText(Signup.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
                        signupPassword2.setBackgroundResource(R.drawable.input_error);
                    } else {
                        signupPassword2.setBackgroundResource(R.drawable.input_border);
                    }
                }
            }
        });

        // Set up text change listener for enabling/disabling button
        signupUsername.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    String username = signupUsername.getText().toString();
                    updateButtonState();
                    if (!AccountValidator.isValidUsername(username) && !(username.isEmpty())) {
                        Toast.makeText(Signup.this, "Username must be at least 8 characters long and contain only alphanumeric characters", Toast.LENGTH_SHORT).show();
                        signupUsername.setBackgroundResource(R.drawable.input_error);
                    } else {
                        signupUsername.setBackgroundResource(R.drawable.input_border);
                    }
                }
            }
        });

        // Checker to see that the two passwords are the same.
        signupPassword2.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String confirmPassword = s.toString();
                String password = signupPassword.getText().toString();
                updateButtonState();
                if (!confirmPassword.equals(password) && !confirmPassword.isEmpty()) {
                    signupPassword2.setBackgroundResource(R.drawable.input_error);
                } else {
                    signupPassword2.setBackgroundResource(R.drawable.input_border);
                }
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });


        // Set up button click listener
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Signup.this, Account.class);
                startActivity(intent);
            }
        });
    }

    // Activates and changes the color of the button when the admin inputs are in the correct format
    private void updateButtonState() {
        String textName = signupUsername.getText().toString();
        String textEmail = signupEmail.getText().toString();
        String textPassword = signupPassword.getText().toString();
        String textPassword2 = signupPassword2.getText().toString();
        button.setEnabled(AccountValidator.isValidEmail(textEmail)
                && AccountValidator.isValidPassword(textPassword)
                && AccountValidator.isValidUsername(textName)
                && textPassword.equals(textPassword2));
    }
}