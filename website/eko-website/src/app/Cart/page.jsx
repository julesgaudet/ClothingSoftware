"use client";
import React, { useState, useEffect, use } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import { useRouter } from 'next/navigation';


async function getPicture(id) {
    try {
        const photoJSON = await fetchData(
            `/api/firstPicture/${id}`
        );
        if (photoJSON.length > 0) {
            return photoJSON.map(photoJSON => ({
                id: photoJSON.id_picture,
                url: photoJSON.url,
                idArticle: photoJSON.id_article,
            }));
        } else {
            throw new Error("No picture found for the given id");
        }
    } catch (error) {
        console.error("Error fetching picture:", error);
        throw error;
    }
}

async function getSumPrice(sessionId) {
    try {
        const cartTotal = await fetchData(
            `http://localhost/api/totalPrice/${sessionId}`
        );
        if (cartTotal.length > 0) {
            return cartTotal.total;
        } else {
            throw new Error("No picture found for the given id");
        }
    } catch (error) {
        console.error("Error fetching picture:", error);
        throw error;
    }
}


async function getSessionCart(sessionId) {
    try {
        const cartItems = await fetchData(
            `http://localhost/api/orders/${sessionId}`
        );
        if (cartItems.length > 0) {
            return cartItems.map(cartItem => ({
                name: cartItem.name,
                price: cartItem.price,
                idArticle: cartItem.id_article,
            }));
        } else {
            throw new Error("No picture found for the given id");
        }
    } catch (error) {
        console.error("Error fetching picture:", error);
        throw error;
    }
}





function GenerateProduct({ dataProduct }) {



    const prix = dataProduct.price;


    //////PHOTO/////////////

    const [pictureUrl, setPictureUrl] = useState([]);



    useEffect(() => {
        getPicture(dataProduct.idArticle)
            .then((photo) => setPictureUrl(photo.url))
            .catch((error) => console.error("Error fetching picture:", error));
    }, [dataProduct.idArticle]);




    return (
        <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
            
            <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
                <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2 pb-1 hover:scale-125">
                    <button>x</button>
                </div>
                <img className="h-24" src={pictureUrl} alt={dataProduct.name} />
                <p className="ml-5 mr-28 mr-auto  text-xl text-black">
                    {dataProduct.name}
                </p>
                <p className=" mr-5  text-xl text-black">
                    {dataProduct.price}$
                </p>

            </div>
        </div>

    );

}




export default function Cart() {

    ///STATES / VARIABLES///////

    const router = useRouter();
    const [cartData, setCartData] = useState(null);
    const [total, setTotal] = useState((0));
    const [session, setSession] = useState(null);
    const [sessionCartData, setSessionCartData] = useState(null);

    const prix = 50


    /////////////////////////////
    //ROUTER////////////////////
    ///////////////////////////

    useEffect(() => {
        // Vérifie si router.query est défini et contient la propriété data
        if (router.query && router.query.data) {
            // Parse les données JSON et les stocke dans l'état du panier
            setCartData(JSON.parse(router.query.data));
        }
    }, [router.query]);
    console.log(cartData);


    //////////////////////////////////////
    //GETTING THE CURRENT SESSION ID(?)///
    //////////////////////////////////////

    useEffect(() => {
        // Vérifier si le code de session est déjà présent dans le local storage
        const existingSession = window.localStorage.getItem('MY_SESSION');
        // Si le code de session existe déjà, le récupérer et le définir dans l'état
        setSession(JSON.parse(existingSession));
    }, []);    //pour récupérer le id_session

    ////////////////////////////////
    //GET SESSION CART//////////
    //retrieving the total with the session id////
    ////////////////////////////////
    const sessionId = 'session_1';


    useEffect(() => {
        getSessionCart(sessionId)
            .then((cart) => setSessionCartData(cart))
            .catch((error) => console.error("Error fetching picture:", error));
        getSumPrice(sessionId)
            .then((sum) => setTotal(sum.total))
            .catch((error) => console.error("Error fetching picture:", error));
    }, [sessionId]);




    return (

        <div className="bg-[#F5F5F7]">
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-160  min-h-screen "
                style={{
                    borderRight: "160px solid transparent",
                    borderLeft: "160px solid transparent",
                }}>

                <div className=" col-span-2 ">
                    <div className="grid h-20 w-auto place-items-left bg-white py-2 text-justified content-center">
                        <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
                            Shopping Cart
                        </h1>
                    </div>
                    <div className="flex gap-40 h-20 w-auto place-items-left bg-[#F5F5F7] px-2 text-justified items-center">
                        <h2 className="text-gray-500 mr-auto">
                            Products
                        </h2>
                        <h2 className="text-gray-500 mr-2">
                            Price
                        </h2>

                    </div>


                    {sessionCartData.map((article, index) => (
                            <GenerateProduct
                                key={index}
                                dataProduct={article}
                            />
                        ))};
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
                                {total} $
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
                                {total * 0.15} $
                            </h2>

                            <hr className=" row-span-1 md:col-span-2 mb-2" ></hr>

                            <h1 class=" text-xl font-bold">
                                Total
                            </h1>
                            <h2 className="text-xl font-bold text-blue-800 text-right ">
                                {total * 0.15 + total} $
                            </h2>


                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

