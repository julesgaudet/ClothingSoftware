'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";

function Cercle({ couleur, isSelected, onClick }) {


  return (
    <div
      className={`w-8 h-8 rounded-full cursor-pointer border-4 ${isSelected ? "border-black" : "border-transparent"
        }`}
      style={{ backgroundColor: couleur }}
      onClick={onClick}
    ></div>
  );
};

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
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

async function getSize(id) {
  try {
    const tailleJSON = await fetchData(`http://localhost/api/size/${id}`);
    if (tailleJSON.length > 0) {
      return tailleJSON.map((taille) => ({
        id: taille.id_size,
        nom: taille.size_name,
        number: taille.number_of_size,
        idArticle: taille.id_article,
      }));
    } else {
      throw new Error("No colors were found for the given id");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}
 

export default function ApercuCouleurs() {
  const router = useRouter();
  const queryString = window.location.search;
  const parametresURL = new URLSearchParams(queryString);
  const id = parametresURL.get("id");

  const[session, setSession ] = useState(null)
  
  // Fonction pour générer un code de session unique
    const generateSessionCode = () => {
      const code = Math.floor(Math.random() * 1000000); // Générer un code aléatoire
      return code;
    };

  useEffect(() => {
    // Vérifier si le code de session est déjà présent dans le local storage
    const existingSession = window.localStorage.getItem('MY_SESSION');
    if (!existingSession) {
      // Si le code de session n'existe pas, générer un nouveau code et le stocker
      const newSession = generateSessionCode();
      setSession(newSession);
      window.localStorage.setItem('MY_SESSION', JSON.stringify(newSession));
    } else {
      // Si le code de session existe déjà, le récupérer et le définir dans l'état
      setSession(JSON.parse(existingSession));
    }
    
  }, []);

  useEffect(() => {
    if (session !== null) {
      // Si le code de session est différent de null, envoyer le code de session
      CartSession(session);
    }
  }, [session]);

  const CartSession = async (session) => {
    const data ={
          id_session: session,
        }

    try {
      const response = await fetch('http://localhost/api/CartSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    
  };

  const [couleurs, setColors] = useState([]);
  const [sizes, setSize] = useState([]);
  //gestion de l'état des sizes
  const [selectedSizes, setSelectedSizes] = useState(null);
  //état des couleurs sélectionnées
  const [selectedColors, setSelectedColors] = useState(null);
  useEffect(() => {
    getColors(id)
      .then((couleurs) => {
        setColors(couleurs);
        // Sélectionner la première couleur par défaut si disponible
        if (couleurs.length > 0) {
          setSelectedColors(couleurs[0]);
        }
      })
      .catch((error) => console.error("Error fetching colors:", error));
    getSize(id)
      .then((sizes) => {
        setSize(sizes);
        // Sélectionner la première taille avec number > 0 par défaut si disponible
        const sizeZero = sizes.find(size => size.number > 0);
        if (sizeZero) {
          setSelectedSizes(sizeZero);
        }
      })
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id]);

  //----------------------------------------------------------------------------------------//
  //gestion d'un click
  const handleColorClick = (couleur) => {
    setSelectedColors(couleur);
   
  }
  //----------------------------------------------------------------------------------------//

  //gestion d'un click
  const handleSizeClick = (size) => {
    if (size.number > 0) {
      setSelectedSizes(size);
    }
  };

    
  const addToCart = async () => {
    const data ={
          id_article: selectedSizes.idArticle,
          id_color: selectedColors.id,
          id_size: selectedSizes.id,
          id_session:session,
        }

    try {
      const response = await fetch('http://localhost/api/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
    } 
    
  };
  

  



  return (
    <>
      <p className="mt-6 ml-6 font-bold size-10">colors:</p>
      <ul className="ml-6 flex gap-2 items-center justify-start">
        {couleurs.map((couleur) => (
          <li key={couleur.id_color}>
            <Cercle couleur={couleur.nom}
              isSelected={couleur === selectedColors} // Passer si la couleur est sélectionnée
              onClick={() => handleColorClick(couleur)} // Passer la fonction de gestion de clic 
            />
          </li>))}
      </ul>
      <p className="mt-6 ml-6 font-bold size-10">Size: </p>
      <ul className="ml-6 flex gap-2 items-center justify-start">
        <li>
          <div className="flex flex-wrap gap-3 mb-3">
            {sizes.map((sizes) => (
              <div
                className={`flex items-center justify-center cursor-pointer border-4 font-bold py-1 px-2 ${sizes.number > 0 ? (sizes === selectedSizes ? "border-[#3858D6] bg-[#3858D6] text-white" : "border-[#3858D6]") : "border-[#808080] bg-[#808080]"
                  }`}
                onClick={() => handleSizeClick(sizes)}
              >
                {sizes.nom}
              </div>
            ))}
          </div>
        </li>

      </ul>
      <div className="flex flex-wrap items-center">
        <button 
         onClick={addToCartHandler}
         onClick={addToCart}
         onClick={CartSession}
          className="m-5 inline-block text-white font-bold py-4 px-20 rounded-lg bg-[#3858D6] border border-transparent transform hover:scale-110 hover:border-white transition-transform duration-3000 ease-in-out mr-2 mb-2"
        >
          Add to Cart
        </button>
        
      </div>
      <p className="ml-6 mt-12 font-bold size-10 text-xl">
        Sustainability
      </p>
      <img
        src="https://i0.wp.com/bleausard.com/wp-content/uploads/2019/04/bleausard_s_engage.png?fit=700%2C700&ssl=1"
        alt="Photo écoresponsable"
        className="ml-6 w-auto h-40 space-x-2"
      />
    </>
  );
}

