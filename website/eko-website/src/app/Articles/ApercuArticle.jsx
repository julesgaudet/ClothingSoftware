import ApercuCouleurs from "./ApercuCouleurs";

export default function ApercuArticle({ vetement }) {
  const nbMaxChar = 18;
  const photo = [
    "https://dimemtl.com/cdn/shop/files/CUTNSEW_SP24D1_FREQUENCYLS_GRAY-02_900x900.jpg?v=1708532931",
    "https://cms.brnstc.de/product_images/680x930_retina/cpro/media/images/product/23/6/100145738613000_1_1685949499996.jpg",
    "https://dimemtl.com/cdn/shop/files/HOOD_SP24D1_ZIP_NIGHTBLUE-02_900x900.jpg?v=1708606305",
    "https://img.ssensemedia.com/images/231482M213017_1/ami-alexandre-mattiussi-black-ami-de-coeur-t-shirt.jpg",
  ];
  return (
    <div className="flex justify-between space-y-5 flex-col">
      <div className="aspect-h-1 aspect-w-1 w-full max-h-96 overflow-hidden border-gray-200 bg-gray-100">
        <img
          src={photo[Math.floor(Math.random() * 4)]} //a changer
          alt={vetement.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <div>
          <a
            href={`Articles?brand=${vetement.brand}`}
            className="text-gray-600 font-black"
          >
            {vetement.brand}
          </a>
        </div>
        <div>
          <div className="flex justify-between">
            <a
              className="text-xl font-bold"
              href={`Article?id=${vetement.id_article}`}
            >
              {vetement.name.length > nbMaxChar
                ? vetement.name.substring(0, nbMaxChar) + "..."
                : vetement.name}
            </a>
            <h2 className="text-l font-semibold text-blue-800">
              {vetement.price}$
            </h2>
          </div>
          <ApercuCouleurs />
        </div>
      </div>
    </div>
  );
}
