import React from "react";
import { ReactTable } from "./ReactTable";

const Table = ({ data }) => {
  return (
    <div className="flex flex-col ">
      <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 rounded-xl shadow-2xl md:custom-box-shadow">
            <ReactTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
