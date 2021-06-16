import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import questionsApi from "apis/questions";
import PageLoader from "components/PageLoader";
import EditForm from "./Form/EditForm";

const EditQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.update({
        id,
        payload: { question: { question } },
      });

      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const fetchQuestionDetails = () => {
    setQuestion("");
    setPageLoading(false);
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <EditForm
        type="update"
        question={question}
        setQuestion={setQuestion}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuestion;
