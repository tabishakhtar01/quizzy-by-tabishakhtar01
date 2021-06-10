import React from "react";
import Table from "./Table";
// import BasicTable from './Table/BasicTable'

const ListQuizzes = ({ data, showQuiz, updateQuiz, destroyQuiz }) => {
  return (
    <>
      <Table
        data={data}
        updateQuiz={updateQuiz}
        showQuiz={showQuiz}
        destroyQuiz={destroyQuiz}
      />
      {/* <BasicTable /> */}
    </>
  );
};

export default ListQuizzes;
