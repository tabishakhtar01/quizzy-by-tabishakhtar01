import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data, showQuiz, destroyQuiz, updateQuiz }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td
            onClick={() => showQuiz(rowData.id)}
            className="cursor-pointer px-6 py-4 text-sm font-medium
            leading-5 text-bb-gray whitespace-no-wrap"
          >
            {rowData.title}
          </td>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer"
          >
            <a
              className="text-sm font-medium
              leading-5 whitespace-no-wrap
              bg-blue-200 hover:bg-blue-700 hover:text-white text-blue-700 font-bold w-full text-center px-5 py-1 rounded-full"
              onClick={() => updateQuiz(rowData.id)}
            >
              Edit
            </a>
          </td>
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer"
          >
            <a
              className="text-sm font-medium
            leading-5 whitespace-no-wrap
            bg-red-200 hover:bg-red-700 hover:text-white text-red-700 font-bold w-full text-center px-2 py-1 rounded-full"
              onClick={() => destroyQuiz(rowData.id)}
            >
              Delete
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyTask: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TableRow;
