import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import questionsApi from "apis/questions";
import PageLoader from "components/PageLoader";
import EditForm from "./Form/EditForm";

const EditQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [answer_one, setAnswer_one] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();
  //   console.log('tapped question id',id,question)

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
  const fetchQuestionDetails = async () => {
    try {
      const response = await questionsApi.list();
      //   console.log(response.data.questions[id-1].question)
      setQuestion(response.data.questions[id - 1].question);
    } catch (error) {
      alert(error);
    } finally {
      setPageLoading(false);
    }
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
