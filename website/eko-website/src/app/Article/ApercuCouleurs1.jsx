'use client'
import colorsJSON from "../dataJSON/colorsJSON.json";
import { useRouter } from 'next/navigation';
// import { getColorName } from '../utils/utils';


function Cercle({ couleur }) {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-${couleur}`}
      style={{ backgroundColor: couleur }}
    ></div>
  );
}

export default function ApercuCouleurs() {

  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");
 
const couleurs = colorsJSON.filter(item => item.id_article === id);

  return (
    <>
      <p className="font-bold size-10">colors:</p>    
    <ul className="flex gap-2 items-center justify-start">
      {couleurs.map((couleur) => (
        <li key={couleur.id_color}>
          <button><Cercle couleur={couleur.color_code} /></button>
        </li>
      ))}
    </ul>
    </>
  );
}
