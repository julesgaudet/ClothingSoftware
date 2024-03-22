'use client'
import pictureJSON from "../dataJSON/pictureJSON.json";
import { useRouter } from 'next/navigation';

export default function ApercuArticle1({vetement}) {

  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");


const photo = pictureJSON.filter(item => item.id_article === id);

  console.log("url: ",photo.url );
 return (

   <div className="col-span-1">
    {photo.map((photo) =>(
       <img key={photo.id} src={photo.url} alt={vetement.nom} className="w-full h-auto" />))}
   </div>
   
 );
}
