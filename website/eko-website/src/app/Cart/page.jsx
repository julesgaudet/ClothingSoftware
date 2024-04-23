"use client";
import React, { useState, useEffect } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";

//==========================================================================================//
//==========================================================================================//
//donction pour générer un produit
function GenerateProduct({ dataProduct, deleteArticle }) {
  //----------------------------------------------------------------------------------------//
  //obtient la photo de l'article
  const [url, setUrl] = useState(null);
  const [articleColor, setArticleColor] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/firstPicture/${dataProduct.id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const photoJSON = await response.json();
        const photoArticle = photoJSON[0].url;
        setUrl(photoArticle);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };
    fetchData();
  }, [dataProduct]);

  //----------------------------------------------------------------------------------------//
  //obtient le nom de la couleur de l'article
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://www.thecolorapi.com/id?hex=${dataProduct.color.replace(
          "#",
          ""
        )}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const colorNameJSON = await response.json();
        const colorName = colorNameJSON.name.value;
        setArticleColor(colorName);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, []);

  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
  return (
    <div className="flex h-40 w-auto  bg-white text-justified items-center ">
      <div className=" flex place-items-left items-center mr-auto">
        <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2  hover:scale-125">
          <button onClick={() => deleteArticle(dataProduct)}>x</button>
        </div>
        <img className="h-24" src={url} alt={dataProduct.name} />
        <p className="ml-5 mr-auto text-xl text-black">{dataProduct.name}</p>
      </div>

      <div className="justify-items-start w-80 mr-10 ">
        <p className="ml-5  text-xl text-black">Size: {dataProduct.size}</p>
        <p className="ml-5 mr-auto text-xl text-black">
          Color:{" "}
          {articleColor.length > 18
            ? `${articleColor.substring(0, 18)}...`
            : articleColor}
        </p>
        <div className="flex mx-5">
          <div
            className={`w-8 h-8 rounded-full`}
            style={{ backgroundColor: dataProduct.color }}
          ></div>
          <p className=" mr-5 ml-5 mltext-xl text-black mt-1">
            {dataProduct.price}$
          </p>
        </div>
      </div>
    </div>
  );
  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
}

//==========================================================================================//
//==========================================================================================//
//obtient les données du cart
async function getCartdata(SetItems, sessionId) {
  try {
    let url = `http://localhost/api/cart/${sessionId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const cartItemsJSON = await response.json();
    const cartitems = cartItemsJSON.map((item) => ({
      id: item.id_article,
      sizeID: item.id_size,
      colorID: item.id_color,
      color: item.color_code,
      size: item.size_name,
      sizeQuant: item.number_of_size,
      name: item.name,
      brand: item.brand,
      price: item.price,
    }));
    if (cartitems.length > 0) {
      SetItems(cartitems);
    }
  } catch (error) {
    console.error("Une erreur s'est produite:", error);
  }
}

//==========================================================================================//
//==========================================================================================//
//fonction principale
export default function Cart() {
  //----------------------------------------------------------------------------------------//
  //gestion session id

  // Fonction pour générer un code de session unique
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Vérifier si le code de session est déjà présent dans le local storage
    const existingSession = window.localStorage.getItem("MY_SESSION");
    // Si le code de session existe déjà, le récupérer et le définir dans l'état
    setSessionId(JSON.parse(existingSession));
  }, []);

  //----------------------------------------------------------------------------------------//
  const [items, setItems] = useState([]);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer les données depuis l'API
  useEffect(
    () => {
      const fetchData = async () => {
        getCartdata(setItems, sessionId);
      };

      fetchData();
    },
    [sessionId],
    [items]
  );

  console.log("items", items);

  const prixTotal = items.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  //----------------------------------------------------------------------------------------//
  //suprime un article du panier
  const deleteArticle = async (dataProduct) => {
    try {
      const response = await fetch(
        `http://localhost/api/deleteArticle/${dataProduct.id}/${dataProduct.colorID}/${dataProduct.sizeID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
      // Mise à jour de l'état du panier après la suppression
      getCartdata(setItems, sessionId);

      // Vous devrez probablement recharger les données du panier après la suppression
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
  return (
    <div className="bg-[#F5F5F7]">
      <Header />
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  min-h-screen "
        style={{
          borderRight: "160px solid transparent",
          borderLeft: "160px solid transparent",
        }}
      >
        <div className=" col-span-2 ">
          <div className="grid h-20 w-auto place-items-left bg-white py-2 text-justified content-center">
            <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
              Shopping Cart
            </h1>
          </div>
          <div className="flex gap-40 h-20 w-auto place-items-left bg-[#F5F5F7] px-2 text-justified items-center">
            <h2 className="text-gray-500 mr-auto">Products</h2>
            <h2 className="text-gray-500 mr-2">Price</h2>
          </div>

          {items.length == 0 ? (
            <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center ">
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-400">
                No products found in cart
              </h1>
            </div>
          ) : (
            items.map((article, index) => (
              <GenerateProduct
                key={index}
                dataProduct={article}
                deleteArticle={deleteArticle}
              />
            ))
          )}
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded h-fit">
            <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-auto">
              <h1 className=" text-xl font-bold">Total</h1>

              <h2 className="text-xl font-bold text-blue-800 text-right ">
                {prixTotal.toFixed(2)} $
              </h2>

              <a
                href="/Checkout"
                className="inline-block w-full text-white text-center font-bold py-2 px-4 cursor-pointer rounded-lg bg-[#3858D6] 
                                border border-transparent transform hover:scale-105 transition-transform duration-3000 ease-in-out mr-2 mb-2 mt-10 col-span-2"
              >
                Check out
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
}
