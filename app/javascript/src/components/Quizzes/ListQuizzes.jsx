import React from "react";
import Table from "./Table";

const ListQuizzes = ({ data, showQuiz, updateQuiz, destroyQuiz }) => {
  return (
    <>
      <Table
        data={data}
        updateQuiz={updateQuiz}
        showQuiz={showQuiz}
        destroyQuiz={destroyQuiz}
      />
    </>
  );
};

export default ListQuizzes;
