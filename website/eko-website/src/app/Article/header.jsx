import React from "react";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex-grow">
        <div className="flex items-center">
          <div className="w-8 h-8 text-white font-black text-xl bg-blue-600 rounded-full flex items-center justify-center mr-2">
            E
          </div>
          <h1 className="text-2xl font-bold text-blue-600">EKO</h1>
        </div>
      </div>
      <nav className="flex-grow">
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="/Articles" className="text-gray-600 hover:text-black">
              Clothing
            </a>
          </li>
          <li>
            <a href="?" className="text-gray-600 hover:text-black">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-grow flex justify-end">
        <div className="w-8 h-8 justify-center mr-2">
          <img
            src="https://www.svgrepo.com/show/363038/shopping-cart-simple-bold.svg"
            className="w-6 h-6 space-x-2"
            alt="Panier"
          ></img>
        </div>
        <a href="/Cart" className="text-gray-600 hover:text-black">
          My Cart
        </a>
      </div>
    </header>
  );
}
