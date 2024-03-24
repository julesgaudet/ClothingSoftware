'use client'

import { useRouter } from 'next/navigation';
// import { getColorName } from '../utils/utils';
import React, { useState, useEffect } from "react";

function Cercle({ couleur, isSelected, onClick }) {


  return (
    <div
      className={`w-8 h-8 rounded-full cursor-pointer border-4 ${isSelected ? "border-black" : "border-transparent"
        }`}
      style={{ backgroundColor: couleur }}
      onClick={onClick}
    ></div>
  );
};

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}


async function getColors(id) {
  try {
    const couleurJSON = await fetchData(`http://localhost/api/color/${id}`);
    if (couleurJSON.length > 0) {
      return couleurJSON.map((couleur) => ({
        id: couleur.id_color,
        nom: couleur.color_code,
        idArticle: couleur.id_article,
      }));
    } else {
      throw new Error("No colors were found for the given id");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}


export default function ApercuCouleurs() {

  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

  const [couleurs, setColors] = useState([]);
  

  useEffect(() => {
    getColors(id)
      .then(setColors)
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id]);
  

  //état des couleurs sélectionnées
  const [selectedColors, setSelectedColors] = useState(null);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click
  const handleColorClick = (couleur) => {
    setSelectedColors(couleur);
  }
  // tableau de size clothing statique
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  //----------------------------------------------------------------------------------------//
  //gestion de l'état des sizes
  const [selectedSizes, setSelectedSizes] = useState(null);
  //gestion d'un click
  const handleSizeClick = (size) => {
    setSelectedSizes(size);
  };
  return (
    // peut etre utiliser si on ajoute le nom de la couleur
    /* <p className="font-bold size-10">colors: {colors.color_name ?? ""}</p> */
    <>
      <p className="font-bold size-10">colors:</p>
      <ul className="flex gap-2 items-center justify-start">
        {couleurs.map((couleur) => (
          <li key={couleur.id_color}>
            <Cercle couleur={couleur.nom}
              isSelected={couleur === selectedColors} // Passer si la couleur est sélectionnée
              onClick={() => handleColorClick(couleur)} // Passer la fonction de gestion de clic 
            />
          </li>))}
          </ul>
          <p className="font-bold size-10">Size </p>
          <ul className="flex gap-2 items-center justify-start">
        <li>
          <div className="flex flex-wrap gap-3 mb-3">
            {sizes.map((size, index) => (
              <div
                key={index}
                className={`flex items-center justify-center cursor-pointer border-4 font-bold py-1 px-2 ${size === selectedSizes ? "border-[#3858D6] bg-[#3858D6] text-white" : "border-[#3858D6]"
                  }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </li>

      </ul>
    </>
  );
}

