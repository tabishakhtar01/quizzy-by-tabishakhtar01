import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import questionsApi from "apis/questions";

const ShowQuestion = ({ match }) => {
  // const { id } = useParams();
  const [questionDetails, setQuestionDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionsApi.show(id);
      setQuestionDetails(response.data.question);
    } catch (error) {
      //   logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <span>Question : </span> {questionDetails?.question}
      </h1>
    </Container>
  );
};

export default ShowTask;
