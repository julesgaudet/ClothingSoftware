"use client";
import footer from "./footer";
import header from "./header";
import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";
import articleJSON from "../dataJSON/articleJSON.json";
import colorsJSON from "../dataJSON/colorsJSON.json";
import getType from "./getId";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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
      return articleJSON.map((articleJSON) => ({
        id: articleJSON.id_article,
        nom: articleJSON.name,
        description: articleJSON.description,
        prix: articleJSON.price,
        marque: articleJSON.brand,
        date: articleJSON.upload_date,
        type: articleJSON.type,
      }));
    } else {
      throw new Error("No colors were found for the given id");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}

export default function Article() {
  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");
  // Utiliser id_route dans la suite de votre code
  //----------------------------------------------------------------------------------------//
  // let dataArticle = {};
  // const article = articleJSON.find(item => item.id_article === id);
  // // Vérifier si l'article a été trouvé
  // if (article) {
  //   // Créer un objet contenant les détails de l'article
  //   dataArticle = {
  //     id: article.id_article || '',
  //     nom: article.name || '',
  //     description: article.description || '',
  //     prix: article.price || '',
  //     marque: article.brand || '',
  //     date: article.upload_date || '',
  //     type: article.type || '',
  //   };
  // }
  const [dataArticle, setArticle] = useState([]);

  useEffect(() => {
    getArticles(id)
      .then(setArticle)
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id]);
  console.log(dataArticle);
  console.log(articleJSON);

  const headr = header();
  const footr = footer();

  return (
    <>
      {headr}

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160"
        style={{
          borderRight: "160px solid transparent",
          borderLeft: "160px solid transparent",
        }}
      >
        <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4 ">
          <ApercuArticle1 vetement={dataArticle} />
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
          <div key={dataArticle.id} className="bg-white p-4 rounded">
            <small class="text-gray-500 text-base font-black">
              {dataArticle.marque}
            </small>
            <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4">
              <h2 className="text-xl font-bold">{dataArticle.nom}</h2>
              <h2 className="text-xl font-semibold text-blue-800">
                {dataArticle.prix}$
              </h2>
            </div>

            <p className="text-xl">{dataArticle.description}</p>
            <ApercuCouleurs1 />
            <div className="flex flex-wrap items-center">
              <a
                href={`./Cart`}
                className="inline-block text-white font-bold py-4 px-24 rounded-full bg-[#3858D6] border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out mr-2 mb-2"
              >
                Add to Cart
              </a>
            </div>
            <p className="font-bold size-10 text-xl">Sustainability</p>
            <img
              src="https://i0.wp.com/bleausard.com/wp-content/uploads/2019/04/bleausard_s_engage.png?fit=700%2C700&ssl=1"
              alt="Photo écoresponsable"
              className="w-auto h-40 space-x-2"
            />
            {/* quantiter n'ai pas dans articleJSON */}
            {/* <p className="font-bold size-10">Quantity left: {dataArticle.quantiter} </p> */}
          </div>
        </div>
      </div>
      {footr}
    </>
  );
}