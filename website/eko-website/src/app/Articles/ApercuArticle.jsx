export default function Article({ nom, photoSrc, prix }) {
  return (
    <div className="flex flex-col flex-shrink-0 bg-white sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-2">
      <img src={photoSrc} alt={nom} className="w-full h-auto" />
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{nom}</h2>
        <h2 className="text-xl font-bold">{prix}$</h2>
      </div>
    </div>
  );
}
