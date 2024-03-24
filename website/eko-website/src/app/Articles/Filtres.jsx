import React, { useState, useEffect } from "react";

import Accordion from "./Accordion";

//==========================================================================================//
//==========================================================================================//
//api pour avoir toutes les couleurs uniques
async function getUniqueTypes() {
  try {
    const response = await fetch("http://localhost/api/uniqueTypes");
    if (!response.ok) {
      throw new Error("Failed to fetch unique types");
    }
    const uniqueTypesJSON = await response.json();
    if (!Array.isArray(uniqueTypesJSON) || uniqueTypesJSON.length === 0) {
      throw new Error("No type found");
    }
    return uniqueTypesJSON.map((type) => type.type);
  } catch (error) {
    console.error("Error fetching type:", error);
    throw error;
  }
}

//==========================================================================================//
//==========================================================================================//
function CategoriesFiltres({ handleTypeClick }) {
  //----------------------------------------------------------------------------------------//
  //obtention d'un tableau des types uniques d'un tableau
  const [uniqueTypes, setUniqueTypes] = useState([]);

  useEffect(() => {
    getUniqueTypes()
      .then(setUniqueTypes)
      .catch((error) => console.error("Error fetching Types:", error));
  }, []);

  //----------------------------------------------------------------------------------------//
  return (
    <div className="flex flex-wrap px-1 py-2">
      <div
        className="inline-block text-white font-bold py-2 px-4 cursor-pointer rounded-full bg-[#3858D6] border border-transparent transform hover:scale-110 transition-transform duration-3000 ease-in-out mr-2 mb-2"
        onClick={() => handleTypeClick("All")}
      >
        All
      </div>
      {uniqueTypes.map((type, index) => (
        <div
          key={index}
          className="inline-block text-white font-bold py-2 px-4 cursor-pointer rounded-full bg-[#3858D6] border border-transparent transform hover:scale-110 transition-transform duration-3000 ease-in-out mr-2 mb-2"
          onClick={() => handleTypeClick(type)}
        >
          {type}
        </div>
      ))}
    </div>
  );
}

//==========================================================================================//
//==========================================================================================//
//api pour avoir toutes les couleurs uniques
async function getUniqueColors() {
  try {
    const response = await fetch("http://localhost/api/uniqueColors");
    if (!response.ok) {
      throw new Error("Failed to fetch unique colors");
    }
    const uniqueColorsJSON = await response.json();
    if (!Array.isArray(uniqueColorsJSON) || uniqueColorsJSON.length === 0) {
      throw new Error("No colors found");
    }
    return uniqueColorsJSON.map((color) => color.color_code);
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}

//==========================================================================================//
//==========================================================================================//
function ColorSelector({ handleColorClick, selectedColors }) {
  //----------------------------------------------------------------------------------------//
  // tableau de toutes les couleurs

  const [uniqueColors, setUniqueColors] = useState([]);

  useEffect(() => {
    getUniqueColors()
      .then(setUniqueColors)
      .catch((error) => console.error("Error fetching colors:", error));
  }, []);

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
function SizeSelector({ handleSizeClick, selectedSizes }) {
  //----------------------------------------------------------------------------------------//
  // tableau de size clothing statique
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // tableau de size waist statique
  const sizesWaist = ["24", "26", "28", "30", "32", "34", "36", "38"];

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
export default function Filtres({
  articles,
  handleSizeClick,
  selectedSizes,
  handleColorClick,
  selectedColors,
  handleTypeClick,
}) {
  //----------------------------------------------------------------------------------------//
  //le nb d'items
  let nbItems = 674; //A CHANGER

  //----------------------------------------------------------------------------------------//
  //les éléments de l'accordéon
  const accordionItems = [
    {
      title: "Category",
      content: (
        <CategoriesFiltres
          articles={articles}
          handleTypeClick={handleTypeClick}
        />
      ),
    },
    {
      title: "Color",
      content: (
        <ColorSelector
          handleColorClick={handleColorClick}
          selectedColors={selectedColors}
        />
      ),
    },
    {
      title: "Size",
      content: (
        <SizeSelector
          handleSizeClick={handleSizeClick}
          selectedSizes={selectedSizes}
        />
      ),
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
