"use client";
import React, { useState, useEffect, use } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import { useRouter } from "next/navigation";

function GenerateProduct({ dataProduct }) {
  //////PHOTO/////////////

  const [url, setUrl] = useState(null);
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

  const deleteArticle = async () => {
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
      // Vous devrez probablement recharger les données du panier après la suppression
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
      <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2 pb-1 hover:scale-125">
        <button onClick={deleteArticle}>x</button>
      </div>
      <img className="h-24" src={url} alt={dataProduct.name} />
      <p className="ml-5 mr-28 text-xl text-black">{dataProduct.name}</p>
      <p className=" mr-5 ml-auto mltext-xl text-black">{dataProduct.price}$</p>
    </div>
  );
}

export default function Cart() {
  //////////////////////////////////////
  //GETTING THE CURRENT SESSION ID(?)///
  //////////////////////////////////////
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
  console.log("session", sessionId);
  ////////////////////////////////
  //GET SESSION CART//////////
  //retrieving the total with the session id////
  ////////////////////////////////

  const [items, setItems] = useState([]);

  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
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
        setItems(cartitems);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [sessionId]);

  console.log("items", items);

  const subTotal = items.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );
  const shipping = items.length === 0 ? 0 : 20;
  const tax = subTotal * 0.14975;
  const discount = 0;
  const prixTotal = subTotal + shipping + tax - discount;

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
              <GenerateProduct key={index} dataProduct={article} />
            ))
          )}
        </div>

        <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded">
            <h1 class="m-6  text-xl font-bold">Total</h1>
            <hr></hr>
            <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-auto">
              <h2 className="text-gray-500 mb-2">Sub-total</h2>

              <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                {subTotal.toFixed(2)} $
              </h2>
              <h2 className="text-gray-500 mb-2">Shipping</h2>

              <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                {shipping.toFixed(2)} $
              </h2>
              <h2 className="text-gray-500 mb-2">Discount</h2>

              <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                0 $
              </h2>
              <h2 className="text-gray-500 mb-2">Tax</h2>

              <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                {tax.toFixed(2)} $
              </h2>

              <hr className=" row-span-1 md:col-span-2 mb-2"></hr>

              <h1 class=" text-xl font-bold">Total</h1>
              <h2 className="text-xl font-bold text-blue-800 text-right ">
                {prixTotal.toFixed(2)} $
              </h2>

              <div
                className="inline-block w-full text-white text-center font-bold py-2 px-4 cursor-pointer rounded-lg bg-[#3858D6] 
                                border border-transparent transform hover:scale-105 transition-transform duration-3000 ease-in-out mr-2 mb-2 mt-10 col-span-2"
              >
                <a href="http://localhost:3000/Checkout"> Check out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
