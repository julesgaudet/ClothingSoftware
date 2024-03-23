'use client'
import React, { useState } from "react";

import footer from "./footer";
import header from "./header";
import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";
import articleJSON from "../dataJSON/articleJSON.json";
import colorsJSON from "../dataJSON/colorsJSON.json";
import getType from "./getId";


import { useRouter } from 'next/navigation';


export default function Article() {
  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");
  // Utiliser id_route dans la suite de votre code
  //----------------------------------------------------------------------------------------//
  let dataArticle = {};
  const article = articleJSON.find(item => item.id_article === id);
  // Vérifier si l'article a été trouvé
  if (article) {
    // Créer un objet contenant les détails de l'article
    dataArticle = {
      id: article.id_article || '',
      nom: article.name || '',
      description: article.description || '',
      prix: article.price || '',
      marque: article.brand || '',
      date: article.upload_date || '',
      type: article.type || '',
    };
  }

  const headr = header();
  const footr = footer();
  const dataColor = colorsJSON.map((color) => ({
    id_color: color.id_color,
    color_code: color.color_code,
    id: color.id_article,
  }));

  return (


    <>
     {headr} 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160" style={{ borderRight:  '160px solid transparent', borderLeft:  '160px solid transparent' }}>
            
        <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4 " style={{ borderLeft:  '25px solid transparent' }}>
          <ApercuArticle1 vetement={dataArticle} />
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
          <div key={dataArticle.id} className="bg-white p-4 rounded">
            <small class="text-gray-500 text-base font-black">{dataArticle.marque}</small>
            <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4">
              <h2 className="text-xl font-bold">{dataArticle.nom}</h2>
              <h2 className="text-l font-semibold text-blue-800">{dataArticle.prix}$</h2>
            </div>
            
            <p>{dataArticle.description}</p>
            <ApercuCouleurs1 />            
            <div className="flex flex-wrap items-center">
              <a  
              href={`./Cart`}
              className="inline-block text-white font-bold py-4 px-24 rounded-full bg-[#3858D6] border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out mr-2 mb-2">
                Add to Cart
              </a>
            </div>
            <p className="font-bold size-10">Sustainability</p>
            <img src="https://i0.wp.com/bleausard.com/wp-content/uploads/2019/04/bleausard_s_engage.png?fit=700%2C700&ssl=1" alt="Photo écoresponsable" className="w-auto h-40 space-x-2" />
            {/* quantiter n'ai pas dans articleJSON */}
            {/* <p className="font-bold size-10">Quantity left: {dataArticle.quantiter} </p> */}
          </div>
        </div>
      </div>
      {footr}
    </>
  );
}

