"use client";
import React, { useState, useEffect } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
export default function Cart() {
    return (
        <div className="bg-[#F5F5F7]">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  mb-11 min-h-screen "
                style={{
                    borderRight: "160px solid transparent",
                    borderLeft: "160px solid transparent",
                }}>

                <div className="row-span-2 md:col-span-2 grid grid-cols-1 ">
                    <div className="ml-40  grid h-20 w-auto place-items-left rounded-md border-2  bg-white py-2 text-justified ">
                        <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
                            Shopping Cart
                        </h1>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 grid grid-cols-1 gap-4">
                    <div className="bg-white p-4 rounded">
                        <small class="m-6  text-xl font-bold">
                            Total
                        </small>
                        <div className="m-6 row-span-1 md:col-span-2 grid grid-cols-2 gap-auto">
                            <h2 className="text-gray-500 ">
                                Sub-total
                            </h2>

                            <h2 className="text-xl font-semibold text-blue-800 text-right">
                                220 $
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

