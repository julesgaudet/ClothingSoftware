import { useState, useEffect } from "react";

export default function ViewArticle({ article }) {
  const [articleColor, setArticleColor] = useState(null);
  const [url, setUrl] = useState(null);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer une photo depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/firstPicture/${article.id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const photoJSON = await response.json();
        const photoArticle = photoJSON[0].url;
        setUrl(photoArticle);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };
    fetchData();
  }, [article]);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer le nom d'une couleur depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://www.thecolorapi.com/id?hex=${article.color.replace(
          "#",
          ""
        )}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const colorNameJSON = await response.json();
        const colorName = colorNameJSON.name.value;
        setArticleColor(colorName);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [article]);

  return (
    <>
      <div className="flex my-2 items-center">
        <a
          href={`Article?id=${article.id}`}
          className="aspect-h-1 aspect-w-1 max-w-1/6 h-24 overflow-hidden items-center justify-center border-4 border-white  hover:border-4 hover:border-[#3858D6]"
        >
          <img
            src={url}
            alt={"ArticleID:" + article.id}
            className="h-full w-full object-cover object-center"
          />
        </a>
        <div className="flex-col w-5/6">
          <div>
            <h1 className="font-medium mb-1">{article.name}</h1>
          </div>

          <div className="flex justify-between ">
            <h1 className="font-medium">
              Size: <span className="text-[#3858D6]">{article.size}</span>
            </h1>
            <h1 className="font-medium">
              Color: <span className="text-[#3858D6]">{articleColor}</span>
            </h1>
            <h1 className="text-[#3858D6] font-medium">
              {"$" + article.price}
            </h1>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}
