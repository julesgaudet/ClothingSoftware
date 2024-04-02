"use client";
import React, { useState, useEffect } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import { useRouter } from 'next/navigation';


    

export default function Cart(){

    const router = useRouter();
    const [cartData, setCartData] = useState(null);
  
    useEffect(() => {
        // Vérifie si router.query est défini et contient la propriété data
        if (router.query && router.query.data) {
            // Parse les données JSON et les stocke dans l'état du panier
            setCartData(JSON.parse(router.query.data));
        }
    }, [router.query]);
    console.log(cartData);
    return (
    <div className="bg-[#F5F5F7]">
    <Header />
        <div className="min-h-screen">
            
            <h1>CART

                COOKIE, ID DE SESSION
  
            </h1>
            <p >content</p>
        </div>
    <Footer />
    </div>
     );

}