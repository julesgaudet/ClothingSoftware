package com.example.clothingsoftware.Class;

import android.content.Context;
import android.net.Uri;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import com.example.clothingsoftware.Activities.More;
import com.example.clothingsoftware.Adapters.FeedAdapter;
import com.example.clothingsoftware.Fragments.Feed;
import com.example.clothingsoftware.Models.FeedModel;

import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class FeedManager {
    private final Context context;
    private final OkHttpClient client;
    private Button buttonDelete;

    public FeedManager(Context context) {
        this.context = context;
        this.client = new OkHttpClient();
    }

    public FeedManager(Context context, Button buttonDelete) {
        this.context = context;
        this.client = new OkHttpClient();
        this.buttonDelete = buttonDelete;
    }

    public void getAllArticles(final FeedAdapter feedAdapter, Feed fragment) {
        String url = "http://10.0.2.2:80/api/app/articles";

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
                Toast.makeText(context, "Error fetching articles", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    try {
                        assert response.body() != null;
                        JSONArray jsonArray = new JSONArray(response.body().string());
                        List<FeedModel> feedItems = new ArrayList<>();

                        // Parse JSON array and create FeedModel objects
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject jsonObject = jsonArray.getJSONObject(i);
                            FeedModel feedModel = new FeedModel();
                            feedModel.setTitle(jsonObject.getString("name"));
                            feedModel.setDescription(jsonObject.getString("description"));
                            feedModel.setPrice(" " + jsonObject.getString("price") + "$");
                            feedModel.setBrand(jsonObject.getString("brand"));

                            // Parse sizes
                            JSONArray sizesArray = jsonObject.getJSONArray("sizes");
                            Map<String, Integer> sizesMap = new HashMap<>();
                            for (int j = 0; j < sizesArray.length(); j++) {
                                JSONObject sizeObject = sizesArray.getJSONObject(j);
                                sizesMap.put(sizeObject.getString("size_name"), sizeObject.getInt("number_of_size"));
                            }
                            feedModel.setItemsPerSize(sizesMap);

                            // Parse colors
                            JSONArray colorsArray = jsonObject.getJSONArray("colors");
                            List<String> colorsList = new ArrayList<>();
                            for (int j = 0; j < colorsArray.length(); j++) {
                                JSONObject colorObject = colorsArray.getJSONObject(j);
                                colorsList.add(colorObject.getString("color_code"));
                            }
                            feedModel.setColors(colorsList);

                            // Parse pictures
                            JSONArray picturesArray = jsonObject.getJSONArray("pictures");
                            List<String> picturesList = new ArrayList<>();
                            for (int j = 0; j < picturesArray.length(); j++) {
                                JSONObject pictureObject = picturesArray.getJSONObject(j);
                                picturesList.add(pictureObject.getString("url"));
                            }
                            feedModel.setImageUrls(picturesList);

                            feedItems.add(feedModel);
                        }

                        // Notify adapter about the data change
                        fragment.requireActivity().runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                feedAdapter.setFeedItems(feedItems);
                            }
                        });

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                } else {
                    Toast.makeText(context, "Error fetching articles", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public void deleteArticle(String articleTitle) {
        String encodedTitle = Uri.encode(articleTitle);
        String url = "http://10.0.2.2:80/api/app/" + encodedTitle;

        Request request = new Request.Builder()
                .url(url)
                .delete()
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
                Log.e("Delete article failed", Objects.requireNonNull(e.getMessage()));
                showDeleteArticleToast("Article can't be deleted");
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    Log.d("FeedManager", "Article deleted successfully");
                    showDeleteArticleToast("Article deleted successfully");
                } else {
                    int statusCode = response.code();
                    assert response.body() != null;
                    String responseBody = response.body().string();
                    if (statusCode == 400) {
                        showDeleteArticleToast("Failed to delete article: " + responseBody);
                    } else {
                        showDeleteArticleToast("Unexpected error: " + statusCode);
                    }
                }
            }
        });
    }

    private void showDeleteArticleToast(String message) {
        ((More) context).runOnUiThread(() -> Toast.makeText(context, message, Toast.LENGTH_SHORT).show());
    }

    public void checkArticleAssociation(String articleTitle) {
        String encodedTitle = Uri.encode(articleTitle);

        String url = "http://10.0.2.2:80/api/app/more/" + encodedTitle;

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
                Log.e("Check article association failed", Objects.requireNonNull(e.getMessage()));
                buttonDelete.post(() -> buttonDelete.setEnabled(false));
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if (response.isSuccessful()) {
                    Log.d("FeedManager", "Article association checked successfully");
                    buttonDelete.post(() -> buttonDelete.setEnabled(true));
                } else {
                    buttonDelete.post(() -> buttonDelete.setEnabled(false));
                }
            }
        });
    }

}
