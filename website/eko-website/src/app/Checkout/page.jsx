"use client"; // important!!!!
import React, { useState, useEffect } from "react";

import Header from "../Article/Header";
import Footer from "../Article/Footer";
import ClientInfo from "./ClientInfo";
import OrderInfo from "./OrderInfo";

export default function Checkout() {
  //----------------------------------------------------------------------------------------//
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [zip, setZip] = useState("");
  const [payment, setPayment] = useState(null);

  const handleName = (name) => {
    setName(name);
  };

  return (
    <>
      <div className="bg-[#F5F5F7] min-h-screen">
        <Header />
        <div className="grid grid-cols-3 gap-4 px-40">
          <div className="col-span-2">
            <ClientInfo
              name={name}
              lastName={lastName}
              email={email}
              address={address}
              country={country}
              city={city}
              region={region}
              zip={zip}
              payment={payment}
              handleName={handleName}
            />
          </div>
          <div className="border-1 col-span-1 bg-white">
            <OrderInfo />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
