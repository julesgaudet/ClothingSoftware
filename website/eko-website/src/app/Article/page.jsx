"use client";
import React, { useState, useEffect } from "react";

import Footer from "./Footer";
import Header from "./Header";
import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";
import getType from "./getId";
import { useRouter } from "next/navigation";

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getArticles(id) {
  try {
    const articleJSON = await fetchData(`http://localhost/api/article/${id}`);
    if (articleJSON.length > 0) {
      return {
        id: articleJSON[0].id_article,
        nom: articleJSON[0].name,
        description: articleJSON[0].description,
        prix: articleJSON[0].price,
        marque: articleJSON[0].brand,
        date: articleJSON[0].upload_date,
        type: articleJSON[0].type,
      };
    } else {
      throw new Error("No Articles were found for the given id");
    }
  } catch (error) {
    console.error("Error fetching Articles:", error);
    throw error;
  }
}

export default function Article() {
  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

  const [dataArticle, setArticle] = useState([]);

  useEffect(() => {
    getArticles(id)
      .then(setArticle)
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id]);


  return (
    <>
      <div className="bg-[#F5F5F7]">
        <Header />

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  mb-11 min-h-screen "
          style={{
            borderRight: "160px solid transparent",
            borderLeft: "160px solid transparent",
          }}
        >
          <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4 ">
            <ApercuArticle1 vetement={dataArticle} />
          </div>

          <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
            <div key={dataArticle.id} className="bg-[#F5F5F7] p-4 rounded">
              <small class="m-6 text-gray-500 text-base font-black">
                {dataArticle.marque}
              </small>

              <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                <h2 className="text-xl font-bold">
                  {dataArticle.nom}
                </h2>
                
                <h2 className="text-xl font-semibold text-blue-800">
                  {dataArticle.prix + " $"}
                </h2>
              </div>

              <p className="m-6 text-l">{dataArticle.description}</p>
              <ApercuCouleurs1 />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
