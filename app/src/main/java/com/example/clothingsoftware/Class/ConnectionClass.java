package com.example.clothingsoftware.Class;

import android.util.Log;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionClass {
    protected static String db = "equipe405@localhost";
    protected static String ip = "pma.tch099.ovh";
    protected static String port = "3306";
    protected static String username = "equipe405";
    protected static String password = "HJ2EPsR7+KQBbCPC";

    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String connectionString = "jdbc:mysql://" + ip + ":" + port + "/" + db;
            conn = DriverManager.getConnection(connectionString, username, password);
        } catch (ClassNotFoundException | SQLException e) {
            Log.e("ERROR", "ERROR IN CONNECTIONCLASS: " + e.getMessage());
        }
        return conn;
    }
}
