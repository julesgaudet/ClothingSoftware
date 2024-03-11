package com.example.clothingsoftware.Fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.clothingsoftware.Activities.More;
import com.example.clothingsoftware.Adapters.FeedAdapter;
import com.example.clothingsoftware.Models.FeedModel;
import com.example.clothingsoftware.R;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Arrays;
import java.util.Map;

public class Feed extends Fragment implements FeedAdapter.OnMoreButtonClickListener {

    private List<FeedModel> feedItems;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_feed, container, false);

        ViewPager2 viewPager2 = view.findViewById(R.id.feedViewPager);
        feedItems = new ArrayList<>();

        FeedModel feedItem1 = new FeedModel();
        feedItem1.setTitle("Enchanté T-Shirt ");
        feedItem1.setPrice("125$");
        feedItem1.setBrand("Nike");
        feedItem1.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem1.setColors(Arrays.asList("#345432", "#222000", "#111444"));
        feedItem1.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        Map<String, Integer> itemsPerSize1 = new HashMap<>();
        itemsPerSize1.put("S", 10);
        itemsPerSize1.put("M", 15);
        itemsPerSize1.put("L", 20);
        feedItem1.setItemsPerSize(itemsPerSize1);
        feedItems.add(feedItem1);


        FeedModel feedItem2 = new FeedModel();
        feedItem2.setTitle("Enchanté T-Shirt ");
        feedItem2.setPrice("125$");
        feedItem2.setBrand("Nike");
        feedItem2.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem2.setColors(Arrays.asList("#245434", "#222020", "#211444", "#245434", "#222020", "#211444", "#245434", "#222020", "#211444"));
        feedItem2.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        Map<String, Integer> itemsPerSize2 = new HashMap<>();
        itemsPerSize2.put("S", 10);
        itemsPerSize2.put("M", 15);
        itemsPerSize2.put("L", 20);
        feedItem2.setItemsPerSize(itemsPerSize2);
        feedItems.add(feedItem2);

        FeedModel feedItem3 = new FeedModel();
        feedItem3.setTitle("Enchanté T-Shirt ");
        feedItem3.setPrice("125$");
        feedItem3.setBrand("Nike");
        feedItem3.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem3.setColors(Arrays.asList("#145437", "#222040", "#311444"));
        feedItem3.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        Map<String, Integer> itemsPerSize3 = new HashMap<>();
        itemsPerSize3.put("S", 10);
        itemsPerSize3.put("M", 15);
        itemsPerSize3.put("L", 20);
        feedItem3.setItemsPerSize(itemsPerSize3);
        feedItems.add(feedItem3);

        FeedModel feedItem4 = new FeedModel();
        feedItem4.setTitle("Enchanté T-Shirt ");
        feedItem4.setPrice("125$");
        feedItem4.setBrand("Nike");
        feedItem4.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem4.setColors(Arrays.asList("#045439", "#222060", "#411444"));
        feedItem4.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        Map<String, Integer> itemsPerSize4 = new HashMap<>();
        itemsPerSize4.put("S", 10);
        itemsPerSize4.put("M", 15);
        itemsPerSize4.put("L", 20);
        feedItem4.setItemsPerSize(itemsPerSize4);
        feedItems.add(feedItem4);

        FeedModel feedItem5 = new FeedModel();
        feedItem5.setTitle("Enchanté T-Shirt ");
        feedItem5.setPrice("125$");
        feedItem5.setBrand("Nike");
        feedItem5.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem5.setColors(Arrays.asList("#345470", "#222080", "#511444"));
        feedItem5.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        Map<String, Integer> itemsPerSize5 = new HashMap<>();
        itemsPerSize5.put("S", 10);
        itemsPerSize5.put("M", 15);
        itemsPerSize5.put("L", 20);
        feedItem5.setItemsPerSize(itemsPerSize5);
        feedItems.add(feedItem5);

        FeedModel feedItem6 = new FeedModel();
        feedItem6.setTitle("Enchanté T-Shirt ");
        feedItem6.setPrice("125$");
        feedItem6.setBrand("Nike");
        feedItem6.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem6.setColors(Arrays.asList("#345432", "#222100", "#611444"));
        feedItem6.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        Map<String, Integer> itemsPerSize6 = new HashMap<>();
        itemsPerSize6.put("S", 10);
        itemsPerSize6.put("M", 15);
        itemsPerSize6.put("L", 20);
        feedItem6.setItemsPerSize(itemsPerSize6);
        feedItems.add(feedItem6);

        FeedModel feedItem7 = new FeedModel();
        feedItem7.setTitle("Enchanté T-Shirt ");
        feedItem7.setPrice("125$");
        feedItem7.setBrand("Nike");
        feedItem7.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem7.setColors(Arrays.asList("#345432", "#222120", "#711444"));
        feedItem7.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        Map<String, Integer> itemsPerSize7 = new HashMap<>();
        itemsPerSize7.put("S", 10);
        itemsPerSize7.put("M", 15);
        itemsPerSize7.put("L", 20);
        feedItem7.setItemsPerSize(itemsPerSize7);
        feedItems.add(feedItem7);

        FeedModel feedItem8 = new FeedModel();
        feedItem8.setTitle("Enchanté T-Shirt ");
        feedItem8.setPrice("125$");
        feedItem8.setBrand("Nike");
        feedItem8.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem8.setColors(Arrays.asList("#345432", "#222140", "#811444"));
        feedItem8.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        Map<String, Integer> itemsPerSize8 = new HashMap<>();
        itemsPerSize8.put("S", 10);
        itemsPerSize8.put("M", 15);
        itemsPerSize8.put("L", 20);
        feedItem8.setItemsPerSize(itemsPerSize8);
        feedItems.add(feedItem8);

        FeedModel feedItem9 = new FeedModel();
        feedItem9.setTitle("Enchanté T-Shirt ");
        feedItem9.setPrice("125$");
        feedItem9.setBrand("Nike");
        feedItem9.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem9.setColors(Arrays.asList("#345432", "#222160", "#911444"));
        feedItem9.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465",
                "https://enchante.co/cdn/shop/files/enchante_11.4.2324945_cc61b2f2-b8f7-4c2f-882e-0b7f752e5933.jpg?v=1700050465"));
        Map<String, Integer> itemsPerSize9 = new HashMap<>();
        itemsPerSize9.put("S", 10);
        itemsPerSize9.put("M", 15);
        itemsPerSize9.put("L", 20);
        feedItem9.setItemsPerSize(itemsPerSize9);
        feedItems.add(feedItem9);

        FeedModel feedItem10 = new FeedModel();
        feedItem10.setTitle("Enchanté T-Shirt ");
        feedItem10.setPrice("125$");
        feedItem10.setBrand("Nike");
        feedItem10.setDescription("Lorem ipsum dolor sit amet, vix ut nullam noster. Vis " +
                "timeam alterum ne, ad minim ponderum senserit sit. Et per nihil " +
                "quaerendum. Mea clita mentitum definitionem ea, erat mentitum antiopam eu quo. " +
                "Eu ferri paulo vim, per ne ornatus scaevola temporibus. Regione patrioque " +
                "eum ea, aliquip sanctus euripidis eos ei, ius at malis ullum reformidans.");
        feedItem10.setColors(Arrays.asList("#345432", "#222180", "#A11444"));
        feedItem10.setImageUrls(Arrays.asList(
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576",
                "https://enchante.co/cdn/shop/files/ENCHANTE9_ff49cdd4-e467-4bfa-8ba0-6676505f553c_1024x1024.jpg?v=1706672576"));
        Map<String, Integer> itemsPerSize10 = new HashMap<>();
        itemsPerSize10.put("S", 10);
        itemsPerSize10.put("M", 15);
        itemsPerSize10.put("L", 20);
        feedItem10.setItemsPerSize(itemsPerSize10);
        feedItems.add(feedItem10);

        FeedAdapter feedAdapter = new FeedAdapter(feedItems);
        viewPager2.setAdapter(feedAdapter);

        feedAdapter.setOnMoreButtonClickListener(this);

        return view;
    }

    @Override
    public void onMoreButtonClick(int position) {
        FeedModel feedItem = feedItems.get(position);
        Bundle bundle = new Bundle();
        bundle.putString("title", feedItem.getTitle());
        bundle.putString("price", feedItem.getPrice());
        bundle.putString("description", feedItem.getDescription());
        bundle.putString("brand", feedItem.getBrand());

        Map<String, Integer> itemsPerSize = feedItem.getItemsPerSize();
        if (itemsPerSize != null && !itemsPerSize.isEmpty()) {
            StringBuilder sizesStringBuilder = new StringBuilder();
            for (Map.Entry<String, Integer> entry : itemsPerSize.entrySet()) {
                sizesStringBuilder.append(entry.getKey()).append(": ").append(entry.getValue()).append(", ");
            }
            sizesStringBuilder.delete(sizesStringBuilder.length() - 2, sizesStringBuilder.length());
            bundle.putString("itemsPerSize", sizesStringBuilder.toString());
        }
        bundle.putStringArrayList("colors", new ArrayList<>(feedItem.getColors()));
        Intent intent = new Intent(getActivity(), More.class);
        intent.putExtras(bundle);
        startActivity(intent);
    }

}
