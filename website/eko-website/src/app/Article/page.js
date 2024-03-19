import ApercuCouleurs1 from "./ApercuCouleurs1";
import ApercuArticle1 from "./ApercuArticle1";

export default function Article() {
  
  
  const dataArticle = [
    {
      id_article: "1",
      name: "Wave Rugby Sweater",
      description:
        "100% French terry cotton Dyed buttons with Dime logo on the front Ribbed finish on the cuffs and waist Embroidered logo on the left chest The model is 167 cm tall and wears size Small",
      price: "135.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:41:21",
      id_employee: "1",
      photo: [{
        nom: "Nom de l'article",
        photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
        prix: "19.99",
      },
      {
        nom: "Nom de l'article",
        photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
        prix: "19.99",
      },
      {
        nom: "Nom de l'article",
        photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
        prix: "19.99",
      },
      {
        nom: "Nom de l'article",
        photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
        prix: "19.99",
      },
      {
        nom: "Nom de l'article",
        photoSrc: "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
        prix: "19.99",
      },
      ]
    }];

  return (

    <>
      <div className="gird grid-cols-4 gap-10">
        <div className="col-span-1">
          <h1>allo la page d'un article</h1>
        </div>
        <div className="col-span-3 grid grid-cols-template-[75%,1fr] gap-4">

          <div className="col-span-2 flex flex-wrap gap-x-10 justify-left align-top">
            {dataArticle.map((article) => (
              article.photo.map((photo) => (
                <ApercuArticle1
                  key={article.id_article}
                  nom={article.name}
                  photoSrc={photo.photoSrc}
                  prix={article.price}
                />
              ))
            ))}
            <div className="col-span-1 grid grid-cols-3 gap-4">
              {dataArticle.map((article) => (
                <div key={article.id_article}>
                  <div className="bg-white p-4 rounded">
                    <h2 className="text-xl font-bold">{article.name}</h2>
                    <h2 className="text-xl font-bold">{article.price}$</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );


}
