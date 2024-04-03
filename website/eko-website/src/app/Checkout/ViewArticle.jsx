import { useState, useEffect } from "react";

export default function ViewArticle({ article }) {
  const [articleColor, setArticleColor] = useState("");
  const [url, setUrl] = useState(null);

  const nbMaxCharName = 20;
  const nbMaxCharCol = 9;

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
          className="aspect-h-1 aspect-w-1 max-w-1/6 h-24 overflow-hidden items-center justify-center"
        >
          <img
            src={url}
            alt={"ArticleID:" + article.id}
            className="h-full w-full object-cover object-center"
          />
        </a>
        <div className="flex-col w-5/6 pl-4">
          <div>
            <a href={`Article?id=${article.id}`}>
              <h1 className="font-medium mb-1 hover:underline">
                {article.name.length > nbMaxCharName
                  ? `${article.name.substring(0, nbMaxCharName)}...`
                  : article.name}
              </h1>
            </a>
          </div>

          <div className="flex justify-between ">
            <h1 className="font-medium">
              Size: <span className="text-[#3858D6]">{article.size}</span>
            </h1>
            <div className="flex items-center">
              <h1 className="font-medium">Color: </h1>
              <div
                className={`w-3 h-3 rounded-full bg-${article.color} ml-2 mr-1`}
                style={{ backgroundColor: article.color }}
              ></div>
              <h1 className="text-[#3858D6]">
                {articleColor.length > nbMaxCharCol
                  ? `${articleColor.substring(0, nbMaxCharCol)}...`
                  : articleColor}
              </h1>
            </div>

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
