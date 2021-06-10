import React, { useState } from "react";
import Container from "components/Container";
import QuizForm from "components/Quizzes/Form/QuizForm";
import quizzesApi from "apis/quizzes";

const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.create({ quiz: { title } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuizForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuiz;
