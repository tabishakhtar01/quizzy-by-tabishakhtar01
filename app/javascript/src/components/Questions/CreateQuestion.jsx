import React, { useState, useEffect } from "react";
import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "../../apis/questions";
import { useParams } from "react-router-dom";
import quizzesApi from "../../apis/quizzes";

const CreateQuestion = ({ history }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizId, setQuizId] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.create({ question: { question, quiz_id: id } });
      setLoading(false);
      history.push(`/quizzes/${id}/show`);
    } catch (error) {
      //   logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuestionForm
        setQuestion={setQuestion}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
