/* eslint-disable */
import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import { GlobalFilter } from "./GlobalFilter";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

export const ReactTable = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        className="min-w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead
          className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 bg-gray-300"
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
                text-left text-bb-gray-600 text-opacity-50 bg-gray-300"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className="bg-white divide-y divide-gray-200"
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="hover:bg-gray-200">
                {row.cells.map((cell) => {
                  return (
                    <>
                      <td
                        className="cursor-pointer px-6 py-4 text-xl font-normal
                    leading-5 text-bb-gray whitespace-no-wrap"
                        {...row.getRowProps()}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button
          className="text-white bg-gray-600 rounded-full px-2 m-2"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ArrowLeftIcon />
        </button>
        <span className="mt-2">
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className="text-white bg-blue-600 rounded-full px-2 m-2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
};
