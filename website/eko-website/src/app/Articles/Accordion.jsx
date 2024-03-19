import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item border-b border-gray-300">
          <div
            className={`accordion-title font- text-l py-2 cursor-pointer flex justify-between items-center ${
              index === activeIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => onItemClick(index)}
          >
            <span>{item.title}</span>
            <RiArrowDropDownLine
              className={`text-xl transition-transform ${
                index === activeIndex ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {index === activeIndex && (
            <div className="accordion-content p-4">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
