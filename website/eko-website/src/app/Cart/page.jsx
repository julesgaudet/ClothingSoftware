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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  min-h-screen "
                style={{
                    borderRight: "160px solid transparent",
                    borderLeft: "160px solid transparent",
                }}>

                <div className=" col-span-2 ">
                    <div className="grid h-20 w-auto place-items-left rounded-md border-2  bg-white py-2 text-justified ">
                        <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
                            Shopping Cart
                        </h1>
                    </div>
                    <div className="grid h-20 w-auto place-items-left rounded-md border-2  bg-white py-2 text-justified ">
                        <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
                            Shopping Cart
                        </h1>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded">
                        <h1 class="m-6  text-xl font-bold">
                            Total
                        </h1>
                        <hr></hr>
                        <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-auto">
                            <h2 className="text-gray-500 mb-2">
                                Sub-total
                            </h2>

                            <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                                220 $
                            </h2>
                            <h2 className="text-gray-500 mb-2">
                                Shipping
                            </h2>

                            <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                                Free
                            </h2>
                            <h2 className="text-gray-500 mb-2">
                                Discount
                            </h2>

                            <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                                0 $
                            </h2>
                            <h2 className="text-gray-500 mb-2">
                                Tax
                            </h2>

                            <h2 className="text-xl font-bold text-blue-800 text-right mb-2">
                                32.23 $
                            </h2>

                            <hr className=" row-span-1 md:col-span-2 mb-2" ></hr>

                            <h1 class=" text-xl font-bold">
                                Total
                            </h1>
                            <h2 className="text-xl font-bold text-blue-800 text-right ">
                                252.23 $
                            </h2>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

