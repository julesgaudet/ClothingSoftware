import Footer from "./Article/Footer";
import Header from "./Article/Header";
import React, { useState, useEffect } from "react";
import ApercuArticles from "./Articles/ApercuArticles";

export default function Homepage({}) {
  //gestion d'un click sur un brand
  const handleBrandClick = () => {};

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer les données depuis l'API
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/articles?brand=Dime`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const articleJSON = await response.json();
        const formattedData = articleJSON.map((item) => ({
          id: item.id_article,
          nom: item.name,
          description: item.description,
          prix: item.price,
          marque: item.brand,
          date: item.upload_date,
          type: item.type,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, []);

  //----------------------------------------------------------------------------------------//

  return (
    <>
      <div className="flex-col w-full h-ful bg-[#F5F5F7]">
        <div className="bg-gradient-to-br from-blue-900 via-black-300 to-black w-full h-auto ">
          <Header />
          <div className="flex ml-40">
            <div className="flex-col w-[500px]">
              <p className="text-6xl font-bold text-white mb-4 mt-40">
                Eko-Shopping
              </p>
              <p className="text-6xl font-bold text-white">Reinvented</p>
              <p className="text-lg font-semibold text-gray-400 mt-36 mb-4">
                Welcome to EKO., your go-to destination for young, modern, and
                environmentally conscious fashion. We take pride in presenting
                you with a trendy collection of clothing crafted with care,
                prioritizing sustainable materials and fair practices.
              </p>
              <a href="/Articles">
                <div className="inline-block w-full text-white text-center font-bold py-2 px-4 cursor-pointer rounded-lg bg-[#3858D6] border border-transparent transform hover:scale-105 transition-transform duration-3000 ease-in-out mr-2 mb-2">
                  Start Shopping
                </div>
              </a>
            </div>
            <div className="w-[1000px] h-[700px]">
              <img
                src="https://i.imgur.com/39Vuhyf.png"
                alt="image_homepage"
                className="object-cover object-top w-full h-full"
              ></img>
            </div>
          </div>
        </div>
        <div className="flex-col w-full">
          <p className="text-center w-full font-bold text-4xl pt-10">
            We're on a Misson To Clean Up the Industry
          </p>
          <p className="text-center w-full font-bold text-2xl pt-6">
            Featuring <span className="text-[#3858D6]">Dime's </span>new
            sustainable collection
          </p>

          <div className="flex overflow-x-auto space-x-10 mt-10 mb-5">
            <ApercuArticles
              dataArticles={data}
              handleBrandClick={handleBrandClick}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
