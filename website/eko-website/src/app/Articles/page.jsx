"use client"; // important!!!!
import React, { useState } from "react";

import ApercuArticle from "./ApercuArticle";
import Filtres from "./Filtres";
import getBrand from "./getBrand";
import getType from "./getType";

function typeSelect() {
  if (getBrand() === null && getType() === null) {
    return "/All";
  } else if (getType() === null) {
    return "";
  } else {
    return "/" + getType();
  }
}

function brandSelect() {
  if ((getBrand() === null && getType() === null) || getBrand() === null) {
    return "";
  } else {
    return "/" + getBrand();
  }
}

export default function Articles() {
  const dataNull = [];
  const dataArticles = [
    {
      id_article: "1",
      name: "Wave Rugby Sweater",
      description:
        "100% French terry cotton Dyed buttons with Dime logo on the front Ribbed finish on the cuffs and waist Embroidered logo on the left chest The model is 167 cm tall and wears size Small",
      price: "135.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:41:21",
      id_employee: "1",
    },
    {
      id_article: "2",
      name: "Frequency LS Shirt",
      description:
        "100% Cotton Rib finishing at neck and sleeve cuffs Big classic embroidery at center front Model is 6'0\" and is wearing a size Medium",
      price: "135.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:48:08",
      id_employee: "1",
    },
    {
      id_article: "3",
      name: "Frequency LS Shirt",
      description:
        "50% Lyocell 50% Cotton Cursive logo embroidery on the chest Ribbing at bottom and sleeves hems Model is 6'0\" and is wearing a size Medium",
      price: "150.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:52:21",
      id_employee: "1",
    },
    {
      id_article: "4",
      name: "Cursive Small Zip Hoodie",
      description:
        "Midweight 12oz 75% Cotton 25% Polyester Two-way zipper Embroidered logo Pre-shrunk Model is 6'0\" and is wearing a size Medium",
      price: "150.00",
      type: "Hoodie",
      brand: "Dime",
      upload_date: "2024-03-14 21:57:07",
      id_employee: "1",
    },
    {
      id_article: "5",
      name: "Classic Small Logo Hoodie",
      description:
        "Midweight 12oz Heavyweight 14oz 100% Cotton Embroidered logo Pre-shrunk Model is 5'6\" and is wearing a size Small",
      price: "100.00",
      type: "Hoodie",
      brand: "Dime",
      upload_date: "2024-03-14 21:59:20",
      id_employee: "1",
    },
    {
      id_article: "6",
      name: "Exe T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:03:24",
      id_employee: "1",
    },
    {
      id_article: "7",
      name: "Banky T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:06:13",
      id_employee: "1",
    },
    {
      id_article: "8",
      name: "Banky Allstar T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:07:34",
      id_employee: "1",
    },
    {
      id_article: "9",
      name: "Skateshop T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:08:22",
      id_employee: "1",
    },
    {
      id_article: "10",
      name: "Collage T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:09:33",
      id_employee: "1",
    },
  ];

  return (
    <>
      <div className="mx-40 my-2">
        <div className="flex flex-col my-10">
          <h1 className="font-black text-5xl">EKO Clothing Shop</h1>
          <h3 className="font-bold text-lg text-gray-500">
            EKO{typeSelect()}
            {brandSelect()}
          </h3>
        </div>

        <div className=" grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="block">
            <Filtres />
          </div>
          {dataArticles.length === 0 ? (
            <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
              <div>
                <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
                  No products found
                </h1>
              </div>
            </div>
          ) : (
            dataArticles.map((article, index) => (
              <ApercuArticle key={index} vetement={article} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
