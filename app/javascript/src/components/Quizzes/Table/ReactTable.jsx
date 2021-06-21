/* eslint-disable */
import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

export const ReactTable = ({ data, updateQuiz, showQuiz, destroyQuiz }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Quiz",
        accessor: "title",

        Cell: (props) => {
          return (
            <span onClick={() => showQuiz(props.row.original.slug)}>
              {props.row.values.title}
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "edit",

        Cell: (props) => {
          return (
            <a
              className="text-xl font-medium
                    leading-5 whitespace-no-wrap
                    bg-blue-200 hover:bg-blue-700 hover:text-white text-blue-700 w-full text-center px-5 py-1 rounded-full"
              onClick={() => updateQuiz(props.row.original.slug)}
            >
              <EditIcon />
              Edit
            </a>
          );
        },
      },
      {
        Header: "",
        accessor: "destroy",

        Cell: (props) => {
          return (
            <a
              className="text-xl font-medium
                  leading-5 whitespace-no-wrap
                  bg-red-200 hover:bg-red-700 hover:text-white text-red-700 w-full text-center px-2 py-1 rounded-full"
              onClick={() => destroyQuiz(props.row.original.slug)}
            >
              <DeleteIcon />
              Delete
            </a>
          );
        },
      },
    ],
    []
  );

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
      <div className="flex justify-end bg-gray-500">
        <button
          className="text-white bg-blue-600 rounded-full px-2 m-2"
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
