import { useState, useEffect } from "react";
import ViewArticle from "./ViewArticle";

export default function OrderInfo() {
  const [items, setItems] = useState(null);

  // Effect pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/carte/${sessionId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cartItemsJSON = await response.json();
        const cartitems = cartItemsJSON.map((item) => ({
          article: item.id_article,
          size: item.id_size,
          color: item.id_color,
        }));
        setItems(cartitems);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="inline-block text-white font-bold py-2 px-4 cursor-pointer rounded-lg bg-[#3858D6] border border-transparent transform hover:scale-110 transition-transform duration-3000 ease-in-out mr-2 mb-2">
          Place Order
        </div>
      </div>
    </>
  );
}
