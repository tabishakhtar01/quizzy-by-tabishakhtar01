import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "components/Container";
import QuizForm from "./Form/QuizForm";
import quizzesApi from "apis/quizzes";
import PageLoader from "components/PageLoader";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.update({
        id,
        payload: { quiz: { title } },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
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
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <QuizForm
        type="update"
        title={title}
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuiz;
