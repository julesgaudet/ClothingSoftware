"use client";
import React, { useState, useEffect } from "react";
import Header from "../Article/Header";
import Footer from "../Article/Footer";
import { useRouter } from 'next/navigation';


async function getPicture(id) {
    try {
        const photoJSON = await fetchData(
            `http://localhost/api/picture/${id}`
        );
        if (photoJSON.length > 0) {
            const firstPhoto = photoJSON[0]; // Get the first photo
            return {
                id: firstPhoto.id_picture,
                url: firstPhoto.url,
                idArticle: firstPhoto.id_article,
            };
        } else {
            throw new Error("No picture found for the given id");
        }
    } catch (error) {
        console.error("Error fetching picture:", error);
        throw error;
    }
}



function GenerateProduct({ Product }) {

    // Counter variable to keep track of the quantity
    const [counter, setCounter] = useState(0);

    // Function to increment the counter
    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    // Function to decrement the counter
    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }

    };

    const prix = Product.price;

    // Function to get the current counter value
    const getCounter = () => {
        return counter;
    };



    const [pictureUrl, setPictureUrl] = useState([]);



    useEffect(() => {
        getPicture(id)
            .then((photo) => setPictureUrl(photo.url))
            .catch((error) => console.error("Error fetching picture:", error));
    }, [id]);




    return (
        <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
            <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2 pb-1 hover:scale-125">
                <button>x</button>
            </div>
            <img className="h-24" src={pictureUrl} alt={Product.name} />
            <p className="ml-5 mr-28  text-xl text-black">
                {Product.name}
            </p>
            <p className="   text-xl text-black">
                {prix}$
            </p>
            <div className=" ml-32 flex h-15 w-32 items-center justify-center rounded-md bg-gray-100 border-2">
                <button onClick={decrementCounter} className="ml-3 mr-auto text-xl text-black click:scale-125">-</button>
                <p className="  text-xl text-black">{counter}</p>
                <button onClick={incrementCounter} className="mr-3 ml-auto text-xl text-black click:scale-125">+</button>
            </div>
            <p className="ml-auto mr-5 text-xl text-black">
                {prix * counter}$
            </p>
        </div>

    );

}




export default function Cart() {

    const router = useRouter();
    const [cartData, setCartData] = useState(null);


    // Counter variable to keep track of the quantity
    const [counter, setCounter] = useState(0);

    // Function to increment the counter
    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    // Function to decrement the counter
    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }

    };

    const prix = 50

    // Function to get the current counter value
    const getCounter = () => {
        return counter;
    };

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
                    <div className="grid h-20 w-auto place-items-left bg-white py-2 text-justified content-center">
                        <h1 className="ml-2 mt-2 text-2xl font-bold tracking-tight text-black">
                            Shopping Cart
                        </h1>
                    </div>
                    <div className="flex gap-40 h-20 w-auto place-items-left bg-[#F5F5F7] px-2 text-justified items-center">
                        <h2 className="text-gray-500 mr-auto">
                            Products
                        </h2>
                        <h2 className="text-gray-500 ">
                            Price
                        </h2>
                        <h2 className="text-gray-500 ">
                            Quantity
                        </h2>
                        <h2 className="text-gray-500 ">
                            Sub-total
                        </h2>
                    </div>


                    <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
                        <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2 pb-1 hover:scale-125">
                            <button>x</button>
                        </div>
                        <img className="h-24" src="https://dimemtl.com/cdn/shop/files/TSHIRTS_SP24D1_COLLAGE_BLACK_900x900.jpg?v=1708372450" alt="image1" />
                        <p className="ml-5 mr-28  text-xl text-black">
                            Acne Studios Basic Shirt
                        </p>
                        <p className="   text-xl text-black">
                            {prix}$
                        </p>
                        <div className=" ml-32 flex h-15 w-32 items-center justify-center rounded-md bg-gray-100 border-2">
                            <button onClick={decrementCounter} className="ml-3 mr-auto text-xl text-black click:scale-125">-</button>
                            <p className="  text-xl text-black">{counter}</p>
                            <button onClick={incrementCounter} className="mr-3 ml-auto text-xl text-black click:scale-125">+</button>
                        </div>
                        <p className="ml-auto mr-5 text-xl text-black">
                            {prix * counter}$
                        </p>
                    </div>


                    <div className="flex h-40 w-auto place-items-left bg-white text-justified items-center ">
                        <div className="w-4 h-4 text-gray-400 bg-white rounded-full flex items-center justify-center mx-10 border-2 pb-1 hover:scale-125">
                            <button>x</button>
                        </div>
                        <img className="h-24" src="https://dimemtl.com/cdn/shop/files/TSHIRTS_SP24D1_COLLAGE_BLACK_900x900.jpg?v=1708372450" alt="image1" />
                        <p className="ml-5 mr-28  text-xl text-black">
                            Acne Studios Basic Shirt
                        </p>
                        <p className="   text-xl text-black">
                            {prix}$
                        </p>
                        <div className=" ml-32 flex h-15 w-32 items-center justify-center rounded-md bg-gray-100 border-2">
                            <button onClick={decrementCounter} className="ml-3 mr-auto text-xl text-black click:scale-125">-</button>
                            <p className="  text-xl text-black">{counter}</p>
                            <button onClick={incrementCounter} className="mr-3 ml-auto text-xl text-black click:scale-125">+</button>
                        </div>
                        <p className="ml-auto mr-5 text-xl text-black">
                            {prix * counter}$
                        </p>
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

