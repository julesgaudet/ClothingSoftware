import React, { useState, useEffect } from "react";
import ApercuCouleurs from "./ApercuCouleurs";

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getPicture(id) {
  try {
    const photoJSON = await fetchData(
      `http://localhost/api/firstPicture/${id}`
    );
    if (photoJSON.length > 0) {
      return {
        id: photoJSON[0].id_picture,
        url: photoJSON[0].url,
        idArticle: photoJSON[0].id_article,
      };
    } else {
      throw new Error("No picture found for the given id");
    }
  } catch (error) {
    console.error("Error fetching picture:", error);
    throw error;
  }
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

function ApercuArticle({ vetement, handleBrandClick }) {
  const nbMaxChar = 20;
  const [colors, setColors] = useState([]);
  const [pictureUrl, setPictureUrl] = useState(null);

  useEffect(() => {
    getColors(vetement.id)
      .then(setColors)
      .catch((error) => console.error("Error fetching colors:", error));
    getPicture(vetement.id)
      .then((photo) => setPictureUrl(photo.url))
      .catch((error) => console.error("Error fetching picture:", error));
  }, [vetement.id]);

  return (
    <div className="flex justify-between space-y-5 flex-col min-w-[260px]">
      <a
        href={`Article?id=${vetement.id}`}
        className="aspect-h-1 aspect-w-1 max-w-80 h-96 overflow-hidden items-center justify-center border-gray-200 bg-gray-100 ease-in-out duration-300 hover:scale-110"
      >
        <img
          src={pictureUrl}
          alt={vetement.nom}
          className="h-full w-full object-cover object-center"
        />
      </a>
      <div>
        <div
          className="text-gray-500 text-base font-black hover:underline cursor-pointer"
          onClick={() => handleBrandClick(vetement.marque)}
        >
          {vetement.marque}
        </div>
        <div className="flex justify-between items-center mb-3">
          <a
            className="text-xl font-bold hover:underline"
            href={`Article?id=${vetement.id}`}
          >
            {vetement.nom.length > nbMaxChar
              ? `${vetement.nom.substring(0, nbMaxChar)}...`
              : vetement.nom}
          </a>
          <h2 className="text-lg font-semibold text-[#3858D6]">
            ${vetement.prix}
          </h2>
        </div>
        <ApercuCouleurs couleurs={colors} />
      </div>
    </div>
  );
}

export default function ApercuArticles({ dataArticles, handleBrandClick }) {
  return (
    <>
      {dataArticles.length === 0 ? (
        <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center">
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-400">
            No products found
          </h1>
        </div>
      ) : (
        dataArticles.map((article, index) => (
          <ApercuArticle
            key={index}
            vetement={article}
            handleBrandClick={handleBrandClick}
          />
        ))
      )}
    </>
  );
}
