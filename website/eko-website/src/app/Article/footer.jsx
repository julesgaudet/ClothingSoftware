import React from "react";

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
          <li>
            <a href="http://localhost:3000/Articles?type=Shirt">Shirts</a>
          </li>
          <li>
            <a href="http://localhost:3000/Articles?type=T-Shirt">T-Shirts</a>
          </li>
          <li>
            <a href="http://localhost:3000/Articles?type=Hoodie">Hoodies</a>
          </li>
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
