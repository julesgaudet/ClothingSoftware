import React from "react";

export default function Header() {
  return (
    <header className="py-10 mx-40 flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 h-8 text-white font-black text-xl bg-blue-600 rounded-full flex items-center justify-center mr-2">
          E
        </div>
        <h1 className="text-2xl font-bold text-blue-600">EKO</h1>
      </div>
      <nav className="flex-grow">
        <div className="flex justify-center space-x-4"> {/* Utiliser flex pour centrer les éléments */}
          <a href="/Articles" className="text-gray-600 hover:text-black">
            Clothing
          </a>
          <a href="?" className="text-gray-600 hover:text-black">
            About
          </a>
        </div>
      </nav>
      <div className="flex items-center ml-auto"> {/* Utiliser ml-auto pour aligner à droite */}
        <a href="/Cart" className="flex items-center text-gray-600 hover:text-black">
          <img
            src="https://www.svgrepo.com/show/363038/shopping-cart-simple-bold.svg"
            className="w-6 h-6 mr-2"
            alt="Panier"
          />
          <p>Cart</p>
        </a>
      </div>
    </header>
  );
}
