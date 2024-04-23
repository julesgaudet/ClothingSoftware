"use client"; // important!!!!
import React, { useState, useEffect } from "react";
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
                  src="https://icones.pro/wp-content/uploads/2021/08/icone-x-verte.png"
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
  //de session
  const [sessionId, setSessionId] = useState(null);

  //----------------------------------------------------------------------------------------//
  //les items dans le panier
  const [items, setItems] = useState([]);

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

        return data;
      } else {
        console.error("Error adding order:", data.error);
      }
    } catch (error) {
      console.error("Server Error while addign order:", error);
    }
  };
  //----------------------------------------------------------------------------------------//
  //gestion session id
  // Fonction pour générer un code de session unique
  const generateSessionCode = () => {
    const code = Math.floor(Math.random() * 100000000); // Générer un code aléatoire
    return code;
  };

  useEffect(() => {
    // Vérifier si le code de session est déjà présent dans le local storage
    const existingSession = window.localStorage.getItem("MY_SESSION");
    if (!existingSession) {
      // Si le code de session n'existe pas, générer un nouveau code et le stocker
      const newSession = generateSessionCode();
      setSessionId(newSession);
      window.localStorage.setItem("MY_SESSION", JSON.stringify(newSession));
    } else {
      // Si le code de session existe déjà, le récupérer et le définir dans l'état
      setSessionId(JSON.parse(existingSession));
    }
  }, []);
  //----------------------------------------------------------------------------------------//
  //Ce qui arrive quand on click sur " place order "

  const onClickOrder = async () => {
    try {
      //si il y a une erreur on arrete la fonction tout de suite et on evoit un message d'erreur
      if (!allEmpty(error) || !allFull(clientInfo)) {
        setMsgSuccess("");
        setMsgNon("");
        setMsgNon(
          "🚫 Oops! It seems like there's a small hiccup. 🤔 Please make sure all fields are filled out correctly to proceed with your order. 📝"
        );
        return;
      }

      //on ajoute le client tout en gardant son id dans clientData
      const clientData = await addClient();

      //si il y a bel et bien une réponse
      if (clientData) {
        //on ajoute l'order
        const OrderData = await addOrder(clientData.lastClientId);

        console.log("orderdata:", OrderData);

        //on affiche un message de succès
        setMsgNon("");
        setMsgSuccess("");
        setMsgSuccess(
          "🎉 Great news! Your order confirmation is in! 🌟 Your items are soon to be on their way. Thank you for choosing EKO! Your Order ID is " +
            OrderData.lastOrderId
        );

        //on enleve l'id de session et en donne un nouveau
        const newSession = generateSessionCode();
        setSessionId(newSession);
        window.localStorage.setItem("MY_SESSION", JSON.stringify(newSession));

        //si aucune réponse
      } else {
        setMsgSuccess("");
        setMsgNon("");
        setMsgNon(
          "🛑 Oops! It looks like we've hit a bump in the road. 😔 Our team is on it, working to fix the issue. Please hang tight and try again later! 💼 We appreciate your patience and understanding. If you need immediate assistance, feel free to contact us directly. Thank you! "
        );
      }

      //si il y a une erreur dans les fetch
    } catch (error) {
      setMsgSuccess("");
      setMsgNon("");
      setMsgNon(
        "🛑 Oops! It looks like we've hit a bump in the road. 😔 Our team is on it, working to fix the issue. Please hang tight and try again later! 💼 We appreciate your patience and understanding. If you need immediate assistance, feel free to contact us directly. Thank you! "
      );
    }
  };

  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    console.log("id de session:", sessionId);
    console.log("je cherche les articles avec l'api");

    const fetchData = async () => {
      try {
        let url = `http://localhost/api/cart/${sessionId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cartItemsJSON = await response.json();

        console.log("les items en json", cartItemsJSON);

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
          setItems(cartitems);
          console.log("je set les items", cartitems);
        }

        console.log("je set les items", cartitems);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [sessionId]);

  //----------------------------------------------------------------------------------------//

  console.log("les items:", items);

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
        <div className=" lg:col-span-1 bg-white h-fit mx-8  border-2 lg:mx-0">
          <OrderInfo onClickOrder={onClickOrder} items={items} />
        </div>
      </div>
    </div>
  );
  //----------------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------------//
}
