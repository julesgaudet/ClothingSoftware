import { type } from "os";
import React, { useState, useEffect } from "react";




async function getTypes(){
  try{
    const response = await fetch("http://localhost/api/uniqueTypes");
    if(!response.ok){
      throw new Error("No types found");
    }
    const types = await response.json;
    if(!Array.isArray(types) || types.length == 0){
      throw new Error("No types found");
    }
    return types.map((type) => type.type);
  }
  catch(error){
      console.log("Error", error);
      throw error;
  }
}

function makeLink({handleClick}){

  const [types, setTypes] = useState([]);

   useEffect(() =>
    getTypes().then(setTypes()).catch((error)=>console.log("Error", error))
   );

   return (
    <div>
    {types.map((type, index) => (
      <li key={index} onClick={() => handleClick(type)}>  
          {type}    
      </li>
    ))}
    </div>
   );
}

export default function Footer(){

  const makelink = makeLink();

    return(
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



























export default function Footer() {

  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/uniqueTypes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json().stringify(); 
      })
      .then(data => {
        setTypes(data); 
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []); 
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
          
          {types.map((type) => (
            <li>
              <a href={`http://localhost:3000/Articles?type=${type}`}>
                {type}
              </a>
            </li>
          ))}
        
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
