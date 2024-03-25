"use client";
import footer from "./footer";
import header from "./header";
import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";
import getType from "./getId";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// async function fetchData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }

// async function getArticles(id) {
//   try {
//     const articleJSON = await fetchData(`http://localhost/api/article/${id}`);
//     if (articleJSON.length > 0) {
//       return articleJSON.map((articleJSON) => ({
//         id: articleJSON.id_article,
//         nom: articleJSON.name,
//         description: articleJSON.description,
//         prix: articleJSON.price,
//         marque: articleJSON.brand,
//         date: articleJSON.upload_date,
//         type: articleJSON.type,
//       }));
//     } else {
//       throw new Error("No colors were found for the given id");
//     }
//   } catch (error) {
//     console.error("Error fetching colors:", error);
//     throw error;
//   }
// }

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
  const [data, setData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSort, setSelectedSort] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/articles?order=${selectedSort}`;

        if (selectedType !== null) {
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
  //gestion de l'état des sizes

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

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un sort
  const handleSortClick = (num) => {
    setSelectedSort(num);
  };

  //----------------------------------------------------------------------------------------//
  //état du type sélectionné

  //----------------------------------------------------------------------------------------//
  //gestion d'un click sur un type
  const handleTypeClick = (type) => {
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
  //état du brand sélectionné

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

  console.log("les sizes sélectionées", selectedSizes);
  console.log("les colors sélectionées", selectedColors);
  console.log("le sort slectioné", selectedSort);
  console.log("le type slectioné", selectedType);
  console.log("le brand slectioné", selectedBrand);
  console.log("la data:", data[id-1]);
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
          <ApercuArticle1 vetement={data} />
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
          <div key={data.id} className="bg-white p-4 rounded">
            <small class="text-gray-500 text-base font-black">
              {data.marque}
            </small>
            <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4">
              <h2 className="text-xl font-bold">{data.nom}</h2>
              <h2 className="text-xl font-semibold text-blue-800">
                {data.prix}$
              </h2>
            </div>

            <p className="text-xl">{data.description}</p>
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
