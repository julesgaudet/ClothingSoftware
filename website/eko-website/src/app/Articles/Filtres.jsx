function CategoriesFiltres() {
  return <h2>filtres</h2>;
}

export default function Filtres({ filtre }) {
  let nbItems = 674;
  return (
    <>
      <div className="flex  space-y-5 flex-col ">
        <p className="font-semibold">{nbItems} items</p>
      </div>
    </>
  );
}
