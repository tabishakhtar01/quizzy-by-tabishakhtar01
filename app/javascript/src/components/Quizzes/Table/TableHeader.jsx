import React from "react";
import { compose, head, join, juxt, tail, toUpper } from "ramda";

const TableHeader = () => {
  return (
    <thead
      className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
    text-left text-bb-gray-600 text-opacity-50 bg-gray-300"
    >
      <tr>
        <th
          //   className="px-6 py-3 text-xs font-bold leading-4 tracking-wider
          // text-left text-bb-gray-600 text-opacity-50 uppercase bg-gray-50"
          className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
            text-left text-bb-gray-600 text-opacity-50 bg-gray-300"
        >
          Quiz Name
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
