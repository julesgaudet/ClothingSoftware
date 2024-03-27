async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getPicture(id) {
  try {
    const photoJSON = await fetchData(
      `http://localhost/api/firstPicture/${id}`
    );
    if (photoJSON.length > 0) {
      return {
        id: photoJSON[0].id_picture,
        url: photoJSON[0].url,
        idArticle: photoJSON[0].id_article,
      };
    } else {
      throw new Error("No picture found for the given id");
    }
  } catch (error) {
    console.error("Error fetching picture:", error);
    throw error;
  }
}

export default function ViewArticle({ article }) {
  const [articleColor, setArticleColor] = useState(null);
  const [articleColorName, setArticleColorName] = useState(null);
  const [url, setUrl] = useState(null);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer une photo depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/firstPicture/${article.article}`;
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
  }, []);

  //----------------------------------------------------------------------------------------//
  // Effect pour récupérer le nom d'une couleur depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://www.thecolorapi.com/id?hex=${articleColor}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const colorNameJSON = await response.json();
        const colorName = colorNameJSON.name.value;
        setArticleColorName(colorName);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };

    fetchData();
  }, [articleColor]);

  return <div></div>;
}
