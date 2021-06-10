import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import quizzesApi from "apis/quizzes";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setQuizDetails(response.data.quiz);
    } catch (error) {
      alert(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-end">
        <button
          className="relative  px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-md
         group hover:bg-opacity-90 focus:outline-none"
        >
          <Link to="/">Add questions</Link>
        </button>
      </div>
      <h1 className="mt-10 text-6xl text-gray-600">{quizDetails?.title}</h1>
      <h1
        className="text-xl flex justify-center items-center"
        style={{ height: "50vh" }}
      >
        There are no questions in this quiz.
      </h1>
    </Container>
  );
};

export default ShowQuiz;
