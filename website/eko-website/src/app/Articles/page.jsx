import ApercuCouleurs from "./ApercuCouleurs";
import ApercuArticle from "./ApercuArticle";

export default function Articles() {
  const photo = {
    nom: "Nom de l'article",
    photoSrc:
      "https://media.gq.com/photos/56cb52771388833772dbc5ea/master/pass/GettyImages-465384280.jpg",
    prix: "19.99",
  };

  const dataArticles = [
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
    },
    {
      id_article: "2",
      name: "Frequency LS Shirt",
      description:
        "100% Cotton Rib finishing at neck and sleeve cuffs Big classic embroidery at center front Model is 6'0\" and is wearing a size Medium",
      price: "135.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:48:08",
      id_employee: "1",
    },
    {
      id_article: "3",
      name: "Frequency LS Shirt",
      description:
        "50% Lyocell 50% Cotton Cursive logo embroidery on the chest Ribbing at bottom and sleeves hems Model is 6'0\" and is wearing a size Medium",
      price: "150.00",
      type: "Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 21:52:21",
      id_employee: "1",
    },
    {
      id_article: "4",
      name: "Cursive Small Zip Hoodie",
      description:
        "Midweight 12oz 75% Cotton 25% Polyester Two-way zipper Embroidered logo Pre-shrunk Model is 6'0\" and is wearing a size Medium",
      price: "150.00",
      type: "Hoodie",
      brand: "Dime",
      upload_date: "2024-03-14 21:57:07",
      id_employee: "1",
    },
    {
      id_article: "5",
      name: "Classic Small Logo Hoodie",
      description:
        "Midweight 12oz Heavyweight 14oz 100% Cotton Embroidered logo Pre-shrunk Model is 5'6\" and is wearing a size Small",
      price: "100.00",
      type: "Hoodie",
      brand: "Dime",
      upload_date: "2024-03-14 21:59:20",
      id_employee: "1",
    },
    {
      id_article: "6",
      name: "Exe T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:03:24",
      id_employee: "1",
    },
    {
      id_article: "7",
      name: "Banky T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:06:13",
      id_employee: "1",
    },
    {
      id_article: "8",
      name: "Banky Allstar T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:07:34",
      id_employee: "1",
    },
    {
      id_article: "9",
      name: "Skateshop T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:08:22",
      id_employee: "1",
    },
    {
      id_article: "10",
      name: "Collage T-Shirt",
      description: "100% 6.5oz Cotton Screen printed logo Pre-shrunk Imported",
      price: "50.00",
      type: "T-Shirt",
      brand: "Dime",
      upload_date: "2024-03-14 22:09:33",
      id_employee: "1",
    },
  ];

  return (
    <>
      <div className="gird grid-cols-4 gap-10">
        <div className="col-span-1">
          <h1>allo</h1>
        </div>
        <div className="col-span-4 flex flex-wrap gap-x-10 justify-left align-top">
          {dataArticles.map((article) => (
            <ApercuArticle
              key={article.id_article}
              nom={article.name}
              photoSrc={photo.photoSrc}
              prix={article.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
