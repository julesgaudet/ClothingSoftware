"use client"; // important!!!!
import React, { useState } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import ClientInfo from "./ClientInfo";
import OrderInfo from "./OrderInfo";

function Non({ msg, show, setShow }) {
  return (
    <>
      {show && msg && (
        <div className="fixed top-0 left-0 w-full flex justify-center">
          <div className="bg-red-100 border-2 border-red-400 text-red-700 text-medium px-8 py-6 my-4 mx-40 rounded w-full">
            <div className="flex items-center justify-between">
              <p>{msg}</p>
              <button className="text-sm" onClick={() => setShow(false)}>
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

  const [msgNon, setMsgNon] = useState("");

  const [show, setShow] = useState(false);

  // Fonction pour vérifier si les chaines sont vides
  const allEmpty = (obj) => {
    for (const ele in obj) {
      if (obj[ele] !== "" && obj[ele] != null) {
        return false;
      }
    }
    return true;
  };

  const allFull = (obj) => {
    for (const ele in obj) {
      if (obj[ele] == "" || obj[ele] == null) {
        return false;
      }
    }
    return true;
  };

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

      const data = await response.json();

      if (response.ok) {
        console.log("Client added successfully:", data);
        // Réinitialiser les valeurs du formulaire après l'ajout du client réussi
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
        console.error("Error adding client:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("les Values:", clientInfo);
  console.log("les erreurs:", error);
  console.log("le body de la requete", JSON.stringify(clientInfo));
  console.log("error vide?:", allEmpty(error));
  console.log("client full?:", allFull(clientInfo));

  const onClickOrder = () => {
    if (allEmpty(error) && allFull(clientInfo)) {
      addClient();
      //addOrder();
    } else {
      setMsgNon("Please fill out all the fields correctly to place an order");
      setShow(true);
    }
  };

  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <Header />
      <Non msg={msgNon} show={show} setShow={setShow} />
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
          <OrderInfo onClickOrder={onClickOrder} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
