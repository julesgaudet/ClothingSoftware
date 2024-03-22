package com.example.clothingsoftware.Class;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import com.example.clothingsoftware.Models.PostModel;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.ref.WeakReference;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class PostManager {
    private static final String BASE_URL = "http://10.0.2.2:80/api/postArticle";
    private static final OkHttpClient httpClient = new OkHttpClient();
    private final WeakReference<Context> contextRef;
    private final Executor executor = Executors.newSingleThreadExecutor();

    public PostManager(Context context) {
        this.contextRef = new WeakReference<>(context);
    }

    public void postArticleAsync(PostModel article) {
        executor.execute(() -> {
            Context context = contextRef.get();
            if (context != null) {
                boolean success = postArticle(article);
                Handler handler = new Handler(Looper.getMainLooper());
                handler.post(() -> {
                    if (success) {
                        Toast.makeText(context, "Article posted successfully", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(context, "Failed to post article", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }

    public boolean postArticle(PostModel article) {
        JSONObject json = new JSONObject();
        try {
            json.put("name", article.getName());
            json.put("description", article.getDescription());
            json.put("price", article.getPrice());
            json.put("type", article.getType());
            json.put("brand", article.getBrand());

            // Sizes
            JSONArray sizesArray = new JSONArray();
            List<PostModel.Size> sizes = article.getSizes();
            for (PostModel.Size size : sizes) {
                JSONObject sizeObject = new JSONObject();
                sizeObject.put("size_name", size.getSizeName());
                sizeObject.put("number_of_size", size.getNumberOfSize());
                sizesArray.put(sizeObject);
            }
            json.put("sizes", sizesArray);

            // Colors
            JSONArray colorsArray = new JSONArray();
            List<PostModel.Color> colors = article.getColors();
            for (PostModel.Color color : colors) {
                JSONObject colorObject = new JSONObject();
                colorObject.put("color_code", color.getColorCode());
                colorsArray.put(colorObject);
            }
            json.put("colors", colorsArray);

            // Pictures
            JSONArray picturesArray = new JSONArray();
            List<PostModel.Picture> pictures = article.getPictures();
            for (PostModel.Picture picture : pictures) {
                JSONObject pictureObject = new JSONObject();
                pictureObject.put("url", picture.getUrl());
                picturesArray.put(pictureObject);
            }
            json.put("pictures", picturesArray);

        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }

        RequestBody body = RequestBody.create(MediaType.parse("application/json"), json.toString());

        Request request = new Request.Builder()
                .url(BASE_URL)
                .post(body)
                .build();

        try {
            Response response = httpClient.newCall(request).execute();
            if (response.isSuccessful()) {
                return true;
            } else {
                Log.e("PostManager", "HTTP error: " + response.code());
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
            Log.e("PostManager", "Network error: " + e.getMessage());
            return false;
        }
    }
}
