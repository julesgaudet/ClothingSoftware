"use client"; // important!!!!
import React, { useState } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import ClientInfo from "./ClientInfo";
import OrderInfo from "./OrderInfo";

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

function Succes({ msgSucces, setMsgSuccess }) {
  return (
    <>
      {msgSucces && (
        <div className="fixed top-0 left-0 w-full flex justify-center">
          <div className="bg-green-100 border-2 border-green-400 text-green-700 text-medium px-8 py-6 my-4 mx-40 rounded w-full">
            <div className="flex items-center justify-between">
              <p>{msgSucces}</p>
              <button className="text-sm" onClick={() => setMsgSuccess("")}>
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

export default function Checkout() {
  //----------------------------------------------------------------------------------------//
  const [clientInfo, setClientInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    region: "",
    zip: "",
    phone: "",
    payment: null,
  });

  //----------------------------------------------------------------------------------------//
  const [error, setError] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    region: "",
    zip: "",
    phone: "",
  });
  //----------------------------------------------------------------------------------------//
  //variables d'état pour les message d'erreurs
  const [msgNon, setMsgNon] = useState("");

  //----------------------------------------------------------------------------------------//
  //variable d'état pour les messages de succès
  const [msgSucces, setMsgSuccess] = useState("");

  //----------------------------------------------------------------------------------------//
  //A CHANGER ID de session
  const sessionId = 123456;

  //----------------------------------------------------------------------------------------//
  // Fonction pour vérifier si les erreurs sont vides
  const allEmpty = (obj) => {
    for (const ele in obj) {
      if (obj[ele] !== "" && obj[ele] != null) {
        return false;
      }
    }
    return true;
  };

  //----------------------------------------------------------------------------------------//
  // Fonction pour vérifier si les infos sont pleines
  const allFull = (obj) => {
    for (const ele in obj) {
      if (obj[ele] == "" || obj[ele] == null) {
        return false;
      }
    }
    return true;
  };

  //----------------------------------------------------------------------------------------//
  // Fonction pour envoyer les informations du client à l'API

  const addClient = async () => {
    try {
      const response = await fetch("http://localhost/api/AddClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientInfo),
      });

      //devrait rencouyer l'id du client ajouté en réponse (dans data)
      const data = await response.json();

      if (response.ok) {
        console.log("Client added successfully:", data);
        return data; // Return data pour avoir l'id du client créer
      } else {
        console.error(
          "Error adding client (verify if email is unique):",
          data.error
        );
        return null; // Return null in case of error
      }
    } catch (error) {
      console.error("Server Error while adding client:", error);
      return null; // Return null in case of error
    }
  };

  //----------------------------------------------------------------------------------------//
  // Fonction pour envoyer les informations de commande à l'API
  // pour ajouter une commande son id de session et son id de client doivent DÉJA exister et etre valide!!!

  const addOrder = async (clientId) => {
    // Passer l'ID du client comme paramètre

    try {
      const response = await fetch("http://localhost/api/AddOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "processing", // Statut initial a processing
          payment_option: clientInfo.payment,
          id_session: sessionId, //ID de session
          id_client: clientId, //ID du dernier client ajouté (obtenu en parametre)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order added successfully:", data);

        // Réinitialiser les valeurs du formulaire après l'ajout du client réussi sauf le payement
        setClientInfo({
          name: "",
          lastName: "",
          email: "",
          address: "",
          country: "",
          city: "",
          region: "",
          zip: "",
          phone: "",
          payment: null,
        });
        setError({});
      } else {
        console.error("Error adding order:", data.error);
      }
    } catch (error) {
      console.error("Server Error while addign order:", error);
    }
  };

  //----------------------------------------------------------------------------------------//
  //Ce qui arrive quand on click sur " place order "

  const onClickOrder = async () => {
    try {
      //si il y a une erreur on arrete la fonction tout de suite et on evoit un message d'erreur
      if (!allEmpty(error) || !allFull(clientInfo)) {
        setMsgSuccess("");
        setMsgNon("");
        setMsgNon("Please fill out all the fields correctly to place an order");
        return;
      }

      //on ajoute le client tout en gardant son id dans clientData
      const clientData = await addClient();

      //si il y a bel et bien une réponse
      if (clientData) {
        //on ajoute l'order
        addOrder(clientData.lastClientId);

        //on affiche un message de succès
        setMsgNon("");
        setMsgSuccess("");
        setMsgSuccess(
          "Your order is complete! Your items are on the way. Thank you for choosing us! Order-ID: " +
            clientData.lastClientId
        );

        //si aucune réponse
      } else {
        setMsgSuccess("");
        setMsgNon("");
        setMsgNon(
          "Oops! It seems like an error has occurred on our end. We're actively addressing it. Please try again later!"
        );
      }

      //si il y a une erreur dans les fetch
    } catch (error) {
      setMsgSuccess("");
      setMsgNon("");
      setMsgNon(
        "Oops! It seems like an error has occurred on our end. We're actively addressing it. Please try again later!"
      );
    }
  };

  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <Header />
      <Succes msgSucces={msgSucces} setMsgSuccess={setMsgSuccess} />
      <Non msgNon={msgNon} setMsgNon={setMsgNon} />
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 lg:px-40">
        <div className="lg:col-span-2">
          <ClientInfo
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
            error={error}
            setError={setError}
          />
        </div>
        <div className=" lg:col-span-1 bg-white h-fit mx-8 lg:mx-0">
          <OrderInfo onClickOrder={onClickOrder} sessionId={sessionId} />
        </div>
      </div>
      <Footer />
    </div>
  );
  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
}
