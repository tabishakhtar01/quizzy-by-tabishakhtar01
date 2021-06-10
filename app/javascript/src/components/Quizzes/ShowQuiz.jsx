import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      //   logger.error(error);
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
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray">
        {quizDetails?.title}
      </h1>
    </Container>
  );
};

export default ShowQuiz;
