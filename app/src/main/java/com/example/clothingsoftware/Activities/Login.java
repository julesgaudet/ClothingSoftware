package com.example.clothingsoftware.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.clothingsoftware.Class.AccountValidator;
import com.example.clothingsoftware.Class.ConnectionClass;
import com.example.clothingsoftware.R;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Login extends AppCompatActivity {
    
    CheckBox checkbox;
    EditText loginEmail;
    EditText loginPassword;
    TextView linkSignUp;
    Button button;
    ProgressBar progressBar;
    Connection con;
    String str;
    ConnectionClass connectionClass;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        checkbox = findViewById(R.id.checkbox);
        loginEmail = findViewById(R.id.loginEmail);
        loginPassword = findViewById(R.id.loginPassword);
        linkSignUp = findViewById(R.id.linkSignUp);
        button = findViewById(R.id.button);
        progressBar = findViewById(R.id.progressbar);

        loginEmail.addTextChangedListener(textWatcher);
        loginPassword.addTextChangedListener(textWatcher);

        // Connection with the database
        connectionClass = new ConnectionClass();
        connect();

        // Set up text change listener for enabling/disabling button
        linkSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Login.this, Signup.class);
                startActivity(intent);
                finish();
            }
        });

        loginEmail.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    String email = loginEmail.getText().toString();
                    if (!AccountValidator.isValidEmail(email) && !(email.isEmpty())) {
                        Toast.makeText(Login.this, "Invalid email address", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        loginPassword.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!hasFocus) {
                    String password = loginPassword.getText().toString();
                    if (!AccountValidator.isValidPassword(password) && !(password.isEmpty())) {
                        Toast.makeText(Login.this, "Invalid password", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        // Set up button click listener
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);
                Toast.makeText(Login.this, "Login successful.", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(Login.this, Account.class);
                startActivity(intent);
                progressBar.setVisibility(View.INVISIBLE);
                finish();
            }
        });
    }

    private final TextWatcher textWatcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
            String textEmail = loginEmail.getText().toString();
            String textPassword = loginPassword.getText().toString();
            button.setEnabled(AccountValidator.isValidEmail(textEmail) && AccountValidator.isValidPassword(textPassword));
        }

        @Override
        public void afterTextChanged(Editable s) {

        }
    };

    public void connect() {
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Log.d("Connect", "Attempting database connection...");
                    con = ConnectionClass.getConnection();
                    if (con == null) {
                        str = "Error in connection with MySQL server";
                    } else {
                        str = "Connected with MySQL server";
                    }
                    Log.d("Connect", str); // Log the connection status
                } catch (Exception e) {
                    Log.e("Connect", "Error during database connection", e); // Log any exceptions
                    throw new RuntimeException(e);
                }

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        Toast.makeText(Login.this, str, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}