import Accordion from "./Accordion";

function CategoriesFiltres() {
  return (
    <>
      <div className="flex  space-y-5 flex-col ">
        <p className="font-semibold">Category</p>
      </div>
    </>
  );
}

export default function Filtres({ filtre }) {
  let nbItems = 674;

  const accordionItems = [
    {
      title: "Category",
      content: "Contenu de la section 1...",
    },
    {
      title: "Color",
      content: "Contenu de la section 2...",
    },
    {
      title: "Size",
      content: "Contenu de la section 3...",
    },
  ];

  return (
    <>
      <p className="font-semibold border-b py-2 border-gray-300">
        {nbItems} items
      </p>
      <Accordion items={accordionItems} />
    </>
  );
}
