import React from "react";

function makeLinks() {
  try {
    const typesJSON = fetchData('http://localhost/api/uniqueTypes');
    
      return (
        <>
          {typesJSON.map((type) => (
            <li key={type}>
              <a href={'http://localhost:3000/Articles?type=' + type}>{type}</a>
            </li>
          ))}
        </>
      );
    
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
}


export default function footer() {
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
          <makeLinks />
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