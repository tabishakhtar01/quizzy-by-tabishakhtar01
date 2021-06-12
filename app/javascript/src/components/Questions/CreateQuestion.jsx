import React, { useState, useEffect } from "react";
import Container from "components/Container";
import QuestionForm from "components/Questions/Form/QuestionForm";
import questionsApi from "../../apis/questions";
import { useParams } from "react-router-dom";
import quizzesApi from "../../apis/quizzes";

const CreateQuestion = ({ history }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer_one, setAnswer_one] = useState("");
  const [answer_two, setAnswer_two] = useState("");
  const [answer_three, setAnswer_three] = useState("");
  const [answer_four, setAnswer_four] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.create({
        question: {
          question,
          quiz_id: id,
          options_attributes: [
            { answer: answer_one },
            { answer: answer_two },
            { answer: answer_three },
            { answer: answer_four },
          ],
        },
      });
      setLoading(false);
      history.push(`/quizzes/${id}/show`);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <QuestionForm
        setQuestion={setQuestion}
        setAnswer_one={setAnswer_one}
        setAnswer_two={setAnswer_two}
        setAnswer_three={setAnswer_three}
        setAnswer_four={setAnswer_four}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
