import React from "react";

const Dropdown = ({ dropdownData, title, toggle, handleDropdown }) => {
  return (
    <div className="w-full">
      <button
        className="text-white bg-gray-700 w-full hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={handleDropdown}
      >
        {title}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          !toggle && "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-full`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropdownData.length > 0 &&
            dropdownData.map((dd, i) => (
              <li key={i}>
                <p className="block px-4 py-2 hover:bg-gray-100 ">
                  {dd.topic ? dd.topic : dd}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
