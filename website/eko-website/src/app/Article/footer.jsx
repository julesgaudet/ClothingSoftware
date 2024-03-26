import { type } from "os";
import React, { useState, useEffect } from "react";




async function getTypes() {
  try {
    const response = await fetch("http://localhost/api/uniqueTypes");
    if (!response.ok) {
      throw new Error("No types found");
    }
    const types = await response.json();
    if (!Array.isArray(types) || types.length === 0) {
      throw new Error("No types found");
    }
    return types.map((type) => type.type);
  }
  catch (error) {
    console.error("Error", error);
    throw error;
  }
}



function makeLink() {

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTypes()
      .then(setTypes)
      .catch((error) => console.log("Error", error))
  });
  if (types !== undefined) {
    return (
      <div>
        {types.map((type, index) => (
          <li key={index} /*onClick={() => handleClick(type)}*/>
            <a href={`http://localhost:3000/Articles?type=${type}`}>{type}</a>
          </li>
        ))}
      </div>
    );
  }
  else{
    return (<div><li>undefined</li></div>);
  }

}



export default function Footer() {


  const makelink = makeLink();

  return (
    <footer className="bg-gradient-to-br from-black via-black to-blue-900 text-white text-center p-8 mt-11">
      <div className="flex justify-center">
        <ul className="w-1/2">
          <li className="text-blue-500 mb-5">Our Contacts</li>
          <li>ekoclothings@gmail.com</li>
          <li>514-727-0420</li>
          <li>7003 Côte Saint Luc Rd, Montreal,QC,Canada</li>
        </ul>
        <ul className="w-1/2">
          <li className="text-blue-500 mb-5">Our products</li>

          {makelink}
        </ul>
      </div>
      <p>
        Thank you for coming to{" "}
        <a className="text-blue-700 mt-5" href="http://localhost:3000/">
          our site
        </a>
      </p>
    </footer>
  );
}

/*export default function Footer(){
  const [selectedType, setSelectedType] = useState(null);

  const handleClick = (type) => {setSelectedType(type);};

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost/api/articles?order=${selectedSort}`;

        if (selectedType !== null && selectedType !== "All") {
          url += `&type=${selectedType}`;
        }
        if (selectedBrand !== null) {
          url += `&brand=${selectedBrand}`;
        }
        if (selectedSizes.length > 0) {
          const sizesParam = selectedSizes
            .map((size) => `sizes[]=${size}`)
            .join("&");
          url += `&${sizesParam}`;
        }
        if (selectedColors.length > 0) {
          const colorsParam = selectedColors
            .map(
              (color) =>
                `colors[]=${encodeURIComponent(color.replace("#", ""))}`
            )
            .join("&");
          url += `&${colorsParam}`;
        }

        console.log("L'url:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const articleJSON = await response.json();
        const formattedData = articleJSON.map((item) => ({
          id: item.id_article,
          nom: item.name,
          description: item.description,
          prix: item.price,
          marque: item.brand,
          date: item.upload_date,
          type: item.type,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Une erreur s'est produite:", error);
      }
    };);

  return(makeFooter(handleClick));

}*/



























