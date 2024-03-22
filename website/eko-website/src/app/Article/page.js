'use client'
import React, { useState } from "react";


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


  const dataColor = colorsJSON.map((color) => ({
    id_color: color.id_color,
    color_code: color.color_code,
    id: color.id_article,
  }));

  return (


    <>
      <header className="p-4 flex items-center justify-between">
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
              E
            </div>
            <h1 className="text-2xl font-bold text-blue-600">EKO</h1>
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-4">
            <li><a href="/Articles" className="text-gray-600 hover:text-black">Clothing</a></li>
            <li><a href="?" className="text-gray-600 hover:text-black">About</a></li>
          </ul>
        </nav>
        <div className="flex-grow flex justify-end">
          <div className="w-8 h-8 justify-center mr-2">
            <img src="https://www.svgrepo.com/show/363038/shopping-cart-simple-bold.svg" className="w-6 h-6 space-x-2" alt="Panier" ></img>

          </div>
          <a href="/Cart" className="text-gray-600 hover:text-black">My Cart</a>
        </div>
      </header>

      <div className="col-span-2">

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4">               
            <ApercuArticle1  vetement= {dataArticle} />
            </div>
          
            <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
           
              <div key={dataArticle.id}className="bg-white p-4 rounded">
                  <div className="row-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                  <h2 className="text-xl font-bold">{dataArticle.nom}</h2>
                  <h2 className="text-l font-semibold text-blue-800">{dataArticle.prix}$</h2>
                  </div>
                  <ApercuCouleurs1/>
                  <p className="font-bold size-10">Size </p>
                  {/* quantiter n'ai pas dans articleJSON */}
                  {/* <p className="font-bold size-10">Quantity left: {dataArticle.quantiter} </p> */}
                  <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
                   Add to Cart
                  </button>
                  
                </div> 
              
             
          

        </div>
      </div>
    </>
  );
}

