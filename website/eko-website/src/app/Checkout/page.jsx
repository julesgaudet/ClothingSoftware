"use client"; // important!!!!
import React, { useState } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import ClientInfo from "./ClientInfo";
import OrderInfo from "./OrderInfo";

export default function Checkout() {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    adress: "",
    country: "",
    city: "",
    region: "",
    zip: "",
    phone: "",
    payment: null,
  });

  return (
    <div className="bg-[#F5F5F7] min-h-screen">
      <Header />
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 lg:px-40">
        <div className="lg:col-span-2">
          <ClientInfo clientInfo={clientInfo} setClientInfo={setClientInfo} />
        </div>
        <div className=" lg:col-span-1 bg-white h-fit mx-8 lg:mx-0">
          <OrderInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
}
