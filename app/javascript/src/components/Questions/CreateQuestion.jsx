import React, { useState, useEffect } from "react";
import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "../../apis/question";
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
      history.push("/dashboard");
    } catch (error) {
      //   logger.error(error);
      setLoading(false);
    }
  };

  //   const fetchQuizDetails = async () => {
  //     try {
  //       const response = await quizzesApi.list();
  //       setQuizId(response.data.quizzes[0].id);
  //       setLoading(false);
  //     } catch (error) {
  //       // logger.error(error);
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchQuizDetails();
  //   }, []);

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
