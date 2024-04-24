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
    <div className=" flex-col lg:grid lg:grid-cols-11 items-center text-xl font-medium text-black bg-white py-4">
      <div className="col-span-1 w-full h-full flex justify-center items-center hover:scale-110 transition-transform duration-3000 ease-in-out cursor-pointer">
        <img
          src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-x-mark-circle-thin.png"
          alt="X"
          onClick={() => deleteArticle(dataProduct)}
          className="w-8 h-8"
        />
      </div>

      <div className="col-span-2 flex justify-center items-center">
        <img className="w-32 max-h-30" src={url} alt={dataProduct.name} />
      </div>

      <div className="col-span-3 text-center">
        <p>{dataProduct.name}</p>
      </div>

      <div className="col-span-1 text-center">
        <p>{dataProduct.size}</p>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <div
          className={`w-4 h-4 rounded-full`}
          style={{ backgroundColor: dataProduct.color }}
        ></div>
        <p className="ml-2">
          {articleColor.length > 18
            ? `${articleColor.substring(0, 18)}...`
            : articleColor}
        </p>
      </div>

      <div className="col-span-2 text-center">
        <p>${dataProduct.price}</p>
      </div>
    </div>
  );
  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
}
//==========================================================================================//
//==========================================================================================//
function Non({ msgNon, setMsgNon }) {
  return (
    <>
      {msgNon && (
        <div className="fixed top-0 left-0 w-full flex justify-center">
          <div className="bg-red-100 border-2 border-red-400 text-red-700 text-medium px-8 py-6 my-4 mx-40 rounded w-full">
            <div className="flex items-center justify-between">
              <p>{msgNon}</p>
              <button className="text-sm" onClick={() => setMsgNon("")}>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/815/761/original/cross-close-icon-free-png.png"
                  className="w-6 h-6 mr-2"
                  alt="X"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
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
  //variables d'état pour les message d'erreurs
  const [msgNon, setMsgNon] = useState("");

  //----------------------------------------------------------------------------------------//
  //suprime un article du panier
  const deleteArticle = async (dataProduct) => {
    if (items.length === 1) {
      setMsgNon("");
      setMsgNon(
        "🛒 Whoops! It appears you're attempting to remove the only item in your cart! 🤔 No problem, you can delete it once you've added more items."
      );
    } else {
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
    }
  };

  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
  return (
    <div className="bg-[#F5F5F7]">
      <Header />
      <Non msgNon={msgNon} setMsgNon={setMsgNon} />
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  min-h-screen "
        style={{
          borderRight: "160px solid transparent",
          borderLeft: "160px solid transparent",
        }}
      >
        <div className=" col-span-2 ">
          <div className="grid h-20 w-auto place-items-left bg-white py-2 text-justified content-center">
            <h1 className="ml-4 mt-2 text-2xl font-bold tracking-tight text-black">
              Shopping Cart
            </h1>
          </div>
          <div className="grid grid-cols-11 my-2 w-auto text-center items-center">
            <div className="col-span-1"></div>
            <div className="col-span-2"></div>
            <h2 className="text-gray-500  text-center col-span-3">Product</h2>
            <h2 className="text-gray-500 text-center col-span-1">Size</h2>
            <h2 className="text-gray-500  text-center col-span-2">Color</h2>
            <h2 className="text-gray-500 text-center col-span-2">Price</h2>
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
          <div className="bg-white pt-2 rounded h-fit">
            <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-auto">
              <h1 className=" text-2xl font-bold">Total</h1>

              <h2 className="text-xl font-bold text-blue-800 text-right ">
                ${prixTotal.toFixed(2)}
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
