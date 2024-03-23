"use client"; // important!!!!
import React, { useState, useEffect } from "react";

import ApercuArticles from "./ApercuArticles";
import Filtres from "./Filtres";
import getBrand from "./getBrand";
import getType from "./getType";
import articleJSON from "../dataJSON/articleJSON.json";

//==========================================================================================//
//==========================================================================================//
function typeSelect() {
  if (getBrand() === null && getType() === null) {
    return "/All";
  } else if (getType() === null) {
    return "";
  } else {
    return "/" + getType();
  }
}
//==========================================================================================//
//==========================================================================================//
function brandSelect() {
  if ((getBrand() === null && getType() === null) || getBrand() === null) {
    return "";
  } else {
    return "/" + getBrand();
  }
}

//==========================================================================================//
//==========================================================================================//
export default function Articles() {
  const dataNull = [];

  //----------------------------------------------------------------------------------------//
  //obtention d'un tableau des articles

  const [data, setData] = useState([]);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    fetch("http://localhost/api/article/oldestArticle")
      .then((response) => {
        console.log("Response before parsing JSON:", response);
        return response.json();
      })
      .then((articleJSON) => {
        const formattedData = articleJSON.map((item) => ({
          id: item.id_article,
          nom: item.name,
          description: item.description,
          prix: item.price,
          marque: item.brand,
          date: item.upload_date,
          type: item.type,
        }));
        setData(formattedData);
        console.log(formattedData);
        console.log(articleJSON);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite:", error);
      });
  }, []); // Assure que ce code ne s'exécute qu'une seule fois après le premier rendu

  //----------------------------------------------------------------------------------------//
  //Catégorie select
  const [slectedType, setSelectedType] = useState(null);
  const [slectedColor, setSelectedColor] = useState(null);
  const [slectedSize, setSelectedSize] = useState(null);

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  //----------------------------------------------------------------------------------------//
  //Data filtrée
  function datafiltree(produits, evenement, recherche) {}

  //----------------------------------------------------------------------------------------//
  return (
    <>
      <div className="bg-[#F5F5F7] min-h-screen pt-4">
        <div className="mx-20 my-2  md:mx-40">
          <div className="flex flex-col my-10">
            <h1 className="font-black text-5xl text-[#3858D6]">
              EKO Clothing Shop
            </h1>
            <h3 className="font-bold text-lg text-gray-500">
              EKO{typeSelect()}
              {brandSelect()}
            </h3>
          </div>

          <div className=" grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="block max-w-80">
              <Filtres articles={data} />
            </div>
            <ApercuArticles dataArticles={dataNull} />
          </div>
        </div>
      </div>
    </>
  );
}
//==========================================================================================//
//==========================================================================================//
