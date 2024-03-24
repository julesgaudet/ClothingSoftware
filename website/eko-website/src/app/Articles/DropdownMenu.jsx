import React, { useState } from "react";

export default function DropdownMenu({ handleSortClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md focus:outline-none focus:bg-gray-400"
        onClick={toggleMenu}
      >
        Sort By
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <ul>
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSortClick(1)}
            >
              Latest Arrivals
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSortClick(2)}
            >
              Price: Low to High
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSortClick(3)}
            >
              Price: High to Low
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
