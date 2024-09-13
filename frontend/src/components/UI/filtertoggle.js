import React, { useState } from "react";
import Filters from "./Filters";

function FilterToggle() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0 mt-2 mr-6 py-2 px-4 rounded-full text-primaryOrange-light font-medium focus:outline-none"
        onClick={() => setOpenFilter(!openFilter)}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-6 h-6 text-primaryOrange-light transition-transform ${
            openFilter ? "-rotate-90" : "rotate-90"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} />
    </div>
  );
}

export default FilterToggle;
