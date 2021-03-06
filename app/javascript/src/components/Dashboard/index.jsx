import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Container from "components/Container";
import ListQuizzes from "components/Quizzes/ListQuizzes";
import PageLoader from "components/PageLoader";
import quizzesApi from "apis/quizzes";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const addQuiz = () => {
    history.push(`/quizzes/create`);
  };

  const showQuiz = slug => {
    history.push(`/quizzes/${slug}/show`);
  };

  const updateQuiz = slug => {
    history.push(`/quizzes/${slug}/edit`);
  };

  const destroyQuiz = async slug => {
    try {
      const confirmation = prompt("Type Y to confirm deletion");
      {
        (confirmation === "y" || confirmation === "Y") &&
          (await quizzesApi.destroy(slug));
        await fetchQuizzes();
      }
      await fetchQuizzes();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(quizzes)) {
    return (
      <Container>
        <div className="flex justify-end">
          <button
            onClick={addQuiz}
            className="relative  px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
          >
            Add a new quiz
          </button>
        </div>
        <h1 className="text-6xl text-gray-600">List of quizzes</h1>
        <ListQuizzes
          data={quizzes}
          updateQuiz={updateQuiz}
          showQuiz={showQuiz}
          destroyQuiz={destroyQuiz}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-end">
        <button
          onClick={addQuiz}
          className="relative  px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
        >
          Add a new quiz
        </button>
      </div>
      <h1
        className="text-xl flex justify-center items-center"
        style={{ height: "60vh" }}
      >
        You have not created any quiz
      </h1>
    </Container>
  );
};

export default Dashboard;
