'use client'
import pictureJSON from "../dataJSON/pictureJSON.json";
import { useRouter } from 'next/navigation';
export default function ApercuArticle1({vetement}) {

const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

let dataPhoto = {};
   //obtention d'un tableau des photos de l'article



    // Utiliser id_route dans la suite de votre code
    //----------------------------------------------------------------------------------------//
    
const photo = pictureJSON.find(item => item.id_article === id);
// Vérifier si l'article a été trouvé
if (photo) {
    // Créer un objet contenant les détails de l'article
    dataPhoto = {
        id: photo.id_picture || '',
        url: photo.url || '',
        idArticle: photo.id_article || '',
    };
  }
  console.log("url: ",dataPhoto.url );
 return (

   <div className="col-span-1">
       <img key={dataPhoto.id} src={dataPhoto.url} alt={vetement.nom} className="w-full h-auto" />
   </div>
 );
}
