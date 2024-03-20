import ApercuCouleurs from "./ApercuCouleurs";
import colorsJSON from "../dataJSON/colorsJSON.json"; //a enlever
import pictureJSON from "../dataJSON/pictureJSON.json";

//==========================================================================================//
//==========================================================================================//
//foncton qui fait la carte de 1 article
function ApercuArticle({ vetement }) {
  //----------------------------------------------------------------------------------------//
  //nombre maximal de charactere pour le nom de l'article
  const nbMaxChar = 20;

  //----------------------------------------------------------------------------------------//
  //obtention d'un tableau des couleurs de l'article
  const couleursArticles = colorsJSON.map((couleur) => ({
    id: couleur.id_color,
    nom: couleur.color_code,
    idArticle: couleur.id_article,
  }));

  //----------------------------------------------------------------------------------------//
  //obtention d'un tableau des photos de l'article
  const photosArticles = pictureJSON.map((photo) => ({
    id: photo.id_picture,
    url: photo.url,
    idArticle: photo.id_article,
  }));

  //----------------------------------------------------------------------------------------//
  return (
    <div className="flex justify-between space-y-5 flex-col">
      <a
        href={`Article?id=${vetement.id}`}
        className="aspect-h-1 aspect-w-1 max-w-80 h-96 overflow-hidden items-center justify-center border-gray-200 bg-gray-100 ease-in-out duration-300 hover:scale-110"
      >
        <img
          src={photosArticles[Math.floor(Math.random() * 37)].url} //a changer
          alt={vetement.nom}
          className="h-full w-full object-cover object-center"
        />
      </a>
      <div>
        <div>
          <a
            href={`Articles?brand=${vetement.marque}`}
            className="text-gray-500 text-base font-black hover:underline"
          >
            {vetement.marque}
          </a>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <a
              className="text-xl font-bold hover:underline"
              href={`Article?id=${vetement.id}`}
            >
              {vetement.nom.length > nbMaxChar
                ? vetement.nom.substring(0, nbMaxChar) + "..."
                : vetement.nom}
            </a>
            <h2 className="text-lg font-semibold text-[#3858D6]">
              ${vetement.prix}
            </h2>
          </div>
          <ApercuCouleurs couleurs={couleursArticles} />
        </div>
      </div>
    </div>
  );
}

//==========================================================================================//
//==========================================================================================//
//fonction qui affiche tout les articles
export default function ApercuArticles({ dataArticles }) {
  return (
    <>
      {dataArticles.length === 0 ? (
        <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center">
          <div>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
              No products found
            </h1>
          </div>
        </div>
      ) : (
        dataArticles.map((article) => (
          <ApercuArticle key={article.id_article} vetement={article} />
        ))
      )}
    </>
  );
}
