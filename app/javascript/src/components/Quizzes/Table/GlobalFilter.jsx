import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <span className="flex justify-end m-2">
        <span className="text-xl text-gray-600">Search</span>
        <span>
          <input
            className="block w-full px-3 py-2 placeholder-gray-400
                    transition duration-150 ease-in-out border
                    border-gray-300 rounded-md appearance-none
                    focus:outline-none focus:shadow-outline-blue
                    focus:border-blue-300 sm:text-sm sm:leading-5"
            value={filter || ""}
            onChange={e => setFilter(e.target.value)}
          />
        </span>
      </span>
    </>
  );
};
