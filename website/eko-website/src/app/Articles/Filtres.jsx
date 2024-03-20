import React, { useState } from "react";
import colorsJSON from "../dataJSON/colorsJSON.json"; //a enlever

import Accordion from "./Accordion";

//==========================================================================================//
//==========================================================================================//
function CategoriesFiltres({ articles }) {
  //----------------------------------------------------------------------------------------//
  //obtention d'un tableau des types uniques d'un tableau
  //note : "..." permet de transormer un tableau de struc a 1 élément en un tableau simple
  //ex: [{id:1},{id:2},{id:3}] => [1,2,3] :-)
  const uniqueTypes = [...new Set(articles.map((article) => article.type))];

  //----------------------------------------------------------------------------------------//
  return (
    <div className="flex flex-wrap px-1 py-2">
      {uniqueTypes.map((type, index) => (
        <a
          key={index}
          href={`./Articles?type=${type}`}
          className="inline-block text-white font-bold py-2 px-4 rounded-full bg-[#3858D6] border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out mr-2 mb-2"
        >
          {type}
        </a>
      ))}
    </div>
  );
}

//==========================================================================================//
//==========================================================================================//
function ColorSelector() {
  //----------------------------------------------------------------------------------------//
  // tableau de toutes les couleurs
  const colors = colorsJSON.map((couleur) => ({
    id: couleur.id_color,
    nom: couleur.color_code,
    idArticle: couleur.id_article,
  }));

  //----------------------------------------------------------------------------------------//
  //tableau de chaque couleus unique
  const uniqueColors = [...new Set(colors.map((color) => color.nom))];

  //----------------------------------------------------------------------------------------//
  //état des couleurs sélectionnées
  const [selectedColors, setSelectedColors] = useState([]);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click
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
  return (
    <div className="flex justify-center items-center px-3 py-4">
      <div className="flex flex-wrap gap-2">
        {uniqueColors.map((color, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full cursor-pointer border-4 ${
              selectedColors.includes(color)
                ? "border-black"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );
}

//==========================================================================================//
//==========================================================================================//
function SizeSelector() {
  //----------------------------------------------------------------------------------------//
  // tableau de size clothing statique
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // tableau de size waist statique
  const sizesWaist = ["24", "26", "28", "30", "32", "34", "36", "38"];

  //----------------------------------------------------------------------------------------//
  //gestion de l'état des sizes
  const [selectedSizes, setSelectedSizes] = useState([]);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click
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
  return (
    <div className="flex flex-col justify-center items-center px-3 py-2">
      <div className="w-full justify-start">
        <h1 className="text-lg font-semibold">Clothing</h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-3">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`flex items-center justify-center cursor-pointer border-4 font-bold py-1 px-2 ${
              selectedSizes.includes(size)
                ? "border-[#3858D6] bg-[#3858D6] text-white"
                : "border-[#3858D6]"
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
      <div className="w-full justify-start">
        <h1 className="text-lg font-semibold">Waist</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-3">
        {sizesWaist.map((size, index) => (
          <div
            key={index}
            className={`flex items-center justify-center cursor-pointer border-4 font-bold py-1 px-2 ${
              selectedSizes.includes(size)
                ? "border-[#3858D6] bg-[#3858D6] text-white"
                : "border-[#3858D6]"
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
}

//==========================================================================================//
//==========================================================================================//
export default function Filtres({ articles }) {
  //----------------------------------------------------------------------------------------//
  //le nb d'items
  let nbItems = 674; //A CHANGER

  //----------------------------------------------------------------------------------------//
  //les éléments de l'accordéon
  const accordionItems = [
    {
      title: "Category",
      content: <CategoriesFiltres articles={articles} />,
    },
    {
      title: "Color",
      content: <ColorSelector />,
    },
    {
      title: "Size",
      content: <SizeSelector />,
    },
  ];

  //----------------------------------------------------------------------------------------//
  return (
    <>
      <p className="font-semibold border-b py-2 border-gray-300">
        {nbItems} items
      </p>
      <Accordion items={accordionItems} />
    </>
  );
}
//==========================================================================================//
//==========================================================================================//
