'use client'
import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";
import articleJSON from "../dataJSON/articleJSON.json";
import colorsJSON from "../dataJSON/colorsJSON.json";

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
    id_color:color.id_color,
    color_code:color.color_code,
    id:color.id_article,
  }));


  
  // const dataArticle = [
  //   {
  //     id_article: "1",
  //     name: "Wave Rugby Sweater",
  //     description:
  //       "100% French terry cotton Dyed buttons with Dime logo on the front Ribbed finish on the cuffs and waist Embroidered logo on the left chest The model is 167 cm tall and wears size Small",
  //     price: "135.00",
  //     quantiter:"23",
  //     type: "Shirt",
  //     brand: "Dime",
  //     upload_date: "2024-03-14 21:41:21",
  //     id_employee: "1",
  //     photo: [{
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     {
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     {
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     {
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     {
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     {
  //       nom: "Nom de l'article",
  //       photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
  //       prix: "19.99",
  //     },
  //     ]
  //   }];

  return (
    

    <>
      <header className="p-4 flex items-center justify-between">
        <div className="flex-grow">
        <div className="flex items-center">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
        {/* Insérez le lien pour le logo <img src="" className="w-6 h-6" alt="Logo" /> */}
        E
      </div>
      <h1 className="text-2xl font-bold text-blue-600">EKO Clothing Shop</h1>
    </div>
        </div>
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-4">
             {/*j'ai mit seulement des ? pour l'instant, pour lien vers les autres pages */}
            <li><a href="?" className="text-gray-600 hover:text-black">Woman</a></li>
            <li><a href="?" className="text-gray-600 hover:text-black">Men</a></li>
            <li><a href="?" className="text-gray-600 hover:text-black">About</a></li>
          </ul>
        </nav>
        <div className="flex-grow flex justify-end">
          <a href="?" className="text-gray-600 hover:text-black">My Cart</a>
        </div>
      </header>

      <div className="col-span-1">
          
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
                  <p className="font-bold size-10">Quantity left: {article.quantiter} </p>
                  
                  
                </div> 
              
             
          

        </div>
      </div>
    </>
  );
}

