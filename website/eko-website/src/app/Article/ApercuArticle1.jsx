'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";

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
      `http://localhost/api/picture/${id}`
    );
    if (photoJSON.length > 0) {
      return photoJSON.map(photoJSON => ({
        id: photoJSON.id_picture,
        url: photoJSON.url,
        idArticle: photoJSON.id_article,
      }));
    } else {
      throw new Error("No picture found for the given id");
    }
  } catch (error) {
    console.error("Error fetching picture:", error);
    throw error;
  }
}

export default function ApercuArticle1({ vetement }) {



  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

  const [pictureUrl, setPictureUrl] = useState([]);



  useEffect(() => {
    getPicture(id)
      .then((photo) => setPictureUrl(photo.map((photo) => photo.url)))
      .catch((error) => console.error("Error fetching picture:", error));
  }, [id]);

  return (vetement.length == 0 ? (
    <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center ">
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-400">
        No products found
      </h1>
    </div>
  ) :


    (<>
      {pictureUrl.map((url) => (
        <div className="col-span-1">
          <img src={url} alt={vetement.nom} className="w-full h-auto" />
        </div>
      ))}
    </>)

  );
}
