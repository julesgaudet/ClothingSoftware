"use client"; // important!!!!
import React, { useState, useEffect } from "react";

import ApercuArticles from "./ApercuArticles";
import Filtres from "./Filtres";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import DropdownMenu from "./DropdownMenu";

//==========================================================================================//
//==========================================================================================//
export default function Articles() {
  //a des fins de test
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
  //gestion de l'état des sizes
  const [selectedSizes, setSelectedSizes] = useState([]);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur une taille
  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      // Si la taille est déjà sélectionnée, la retirer de la liste des sélections
      setSelectedSizes(selectedSizes.filter((selected) => selected !== size));
    } else {
      // Sinon, ajouter la taille à la liste des sélections
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  //----------------------------------------------------------------------------------------//
  //état des couleurs sélectionnées
  const [selectedColors, setSelectedColors] = useState([]);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur une couleur
  const handleColorClick = (color) => {
    if (selectedColors.includes(color)) {
      // Si la couleur est déjà sélectionnée, la retirer de la liste des sélections
      setSelectedColors(
        selectedColors.filter((selected) => selected !== color)
      );
    } else {
      // Sinon, ajouter la couleur à la liste des sélections
      setSelectedColors([...selectedColors, color]);
    }
  };

  //----------------------------------------------------------------------------------------//
  //état du sort sélectionné
  const [selectedSort, setSelectedSort] = useState(0);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un sort
  const handleSortClick = (num) => {
    setSelectedSort(num);
  };

  //----------------------------------------------------------------------------------------//
  //état du type sélectionné
  const [selectedType, setSelectedType] = useState(null);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un type
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  //----------------------------------------------------------------------------------------//
  const typeSelect = () => {
    if (selectedType == null && selectedBrand == null) {
      return "/All";
    } else if (selectedType == null) {
      return "";
    } else {
      return "/" + selectedType;
    }
  };

  //----------------------------------------------------------------------------------------//
  //état du brand sélectionné
  const [selectedBrand, setSelectedBrand] = useState(null);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un brand
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };
  //----------------------------------------------------------------------------------------//
  const BrandSelect = () => {
    if (selectedBrand == null) {
      return "";
    } else {
      return "/" + selectedBrand;
    }
  };

  //----------------------------------------------------------------------------------------//
  //console.log
  console.log("les sizes sélectionées", selectedSizes);
  console.log("les colors sélectionées", selectedColors);
  console.log("le sort slectioné", selectedSort);
  console.log("le type slectioné", selectedType);
  console.log("le brand slectioné", selectedBrand);

  //----------------------------------------------------------------------------------------//
  return (
    <>
      <div className="bg-[#F5F5F7] min-h-screen pt-4">
        <Header />
        <div className="mx-20 my-2  md:mx-40">
          <div className="flex justify-between my-10 items-end">
            <div className="flex flex-col ">
              <h1 className="font-black text-5xl text-[#3858D6]">Clothing</h1>
              <h3 className="font-bold text-lg text-gray-500">
                EKO{typeSelect()}
                {BrandSelect()}
              </h3>
            </div>
            <DropdownMenu handleSortClick={handleSortClick} />
          </div>

          <div className=" grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="block max-w-80">
              <Filtres
                articles={data}
                handleSizeClick={handleSizeClick}
                selectedSizes={selectedSizes}
                handleColorClick={handleColorClick}
                selectedColors={selectedColors}
                handleTypeClick={handleTypeClick}
              />
            </div>
            <ApercuArticles
              dataArticles={data}
              handleBrandClick={handleBrandClick}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
//==========================================================================================//
//==========================================================================================//
