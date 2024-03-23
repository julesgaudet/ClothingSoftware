'use client'
import colorsJSON from "../dataJSON/colorsJSON.json";
import { useRouter } from 'next/navigation';
// import { getColorName } from '../utils/utils';
import React, { useState } from "react";

function Cercle({ couleur, isSelected, onClick }) {


  return (
    <div
      className={`w-4 h-4 rounded-full cursor-pointer border-4 ${isSelected ? "border-black" : "border-transparent"
        }`}
      style={{ backgroundColor: couleur }}
      onClick={onClick}
    ></div>
  );
};


//   return (
//     <div className="flex flex-col justify-center items-center px-3 py-2">
//       <div className="w-full justify-start">
//         <h1 className="text-lg font-semibold">Clothing</h1>
//       </div>
//       <div className="flex flex-wrap gap-3 mb-3">
//         {sizes.map((size, index) => (
//           <div
//             key={index}
//             className={`flex items-center justify-center cursor-pointer border-4 font-bold py-1 px-2 ${
//               selectedSizes.includes(size)
//                 ? "border-[#3858D6] bg-[#3858D6] text-white"
//                 : "border-[#3858D6]"
//             }`}
//             onClick={() => handleSizeClick(size)}
//           >
//             {size}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



export default function ApercuCouleurs() {

  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

  const couleurs = colorsJSON.filter(item => item.id_article === id);
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
            <Cercle couleur={couleur.color_code}
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

