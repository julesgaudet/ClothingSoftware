"use client"; // important!!!!
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  // Initiatisation de la page pour le footer
  let typeini = null;
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  if (searchParams.has("type")) {
    const searchType = searchParams.get("type");
    if (searchType != null) {
      typeini = searchType.substring(0, searchType.length);
    }
  }
  //----------------------------------------------------------------------------------------//
  const [data, setData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSort, setSelectedSort] = useState(0);
  const [selectedType, setSelectedType] = useState(typeini);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const router = useRouter();

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer les données depuis l'API

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/articles?order=${selectedSort}`;

        if (selectedType !== null && selectedType !== "All") {
          url += `&type=${selectedType}`;
        }
        if (selectedBrand !== null) {
          url += `&brand=${selectedBrand}`;
        }
        if (selectedSizes.length > 0) {
          const sizesParam = selectedSizes
            .map((size) => `sizes[]=${size}`)
            .join("&");
          url += `&${sizesParam}`;
        }
        if (selectedColors.length > 0) {
          const colorsParam = selectedColors
            .map(
              (color) =>
                `colors[]=${encodeURIComponent(color.replace("#", ""))}`
            )
            .join("&");
          url += `&${colorsParam}`;
        }

        console.log("L'url:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const articleJSON = await response.json();
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
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [
    selectedType,
    selectedBrand,
    selectedSizes,
    selectedColors,
    selectedSort,
  ]);

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
  //gestion d'un click sur un sort
  const handleSortClick = (num) => {
    setSelectedSort(num);
  };

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un type
  const handleTypeClick = (type) => {
    router.replace("/Articles", undefined, { shallow: true });
    setSelectedType(type);
  };

  //----------------------------------------------------------------------------------------//
  const typeSelect = () => {
    if (
      (selectedType == null && selectedBrand == null) ||
      selectedType == "All"
    ) {
      return "/All";
    } else if (selectedType == null) {
      return "";
    } else {
      return "/" + selectedType;
    }
  };

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un brand
  const handleBrandClick = (brand) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
    }
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
  console.log("la data:", data);

  //----------------------------------------------------------------------------------------//
  return (
    <>
      <div className="bg-[#F5F5F7] min-h-screen">
        <Header />
        <div className="mx-20 md:mx-40 min-h-screen">
          <div className="flex justify-between mb-10 items-end">
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
