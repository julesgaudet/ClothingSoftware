import { useState, useEffect } from "react";
import ViewArticle from "./ViewArticle";

export default function OrderInfo({ onClickOrder, sessionId }) {
  const [items, setItems] = useState([]);

  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/cart/${sessionId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cartItemsJSON = await response.json();
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
        setItems(cartitems);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [sessionId]);

  const subTotal = items.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );
  const shipping = 0;
  const tax = subTotal * 0.14975;

  const prixTotal = subTotal + shipping + tax;

  return (
    <>
      <div className="flex-col mx-7 mt-4 mb-8">
        <h1 className="text-xl font-semibold my-6">Order Summary</h1>
        <div className="flex-col">
          {items.length === 0 ? (
            <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center">
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-400">
                No products found
              </h1>
            </div>
          ) : (
            items.map((item, index) => (
              <ViewArticle key={index} article={item} />
            ))
          )}
        </div>
        <div className="flex justify-between mt-5">
          <h1 className="font-medium text-gray-500">Sub-total</h1>
          <h1 className="font-medium">{"$" + subTotal.toFixed(2)}</h1>
        </div>

        <div className="flex justify-between">
          <h1 className="font-medium text-gray-500">Shipping</h1>
          <h1 className="font-medium">{"$" + shipping.toFixed(2)}</h1>
        </div>

        <div className="flex justify-between mb-3">
          <h1 className="font-medium text-gray-500">Tax</h1>
          <h1 className="font-medium">{"$" + tax.toFixed(2)}</h1>
        </div>

        <div className="flex justify-between border-t-2 border-gray-500 py-3">
          <h1 className="text-xl font-semibold">Total</h1>
          <h1 className="text-xl font-semibold">
            {"$" + prixTotal.toFixed(2)}
          </h1>
        </div>

        <div>
          <div
            className="inline-block w-full text-white text-center font-bold py-2 px-4 cursor-pointer rounded-lg bg-[#3858D6] border border-transparent transform hover:scale-105 transition-transform duration-3000 ease-in-out mr-2 mb-2"
            onClick={onClickOrder}
          >
            Place Order
          </div>
        </div>
      </div>
    </>
  );
}
