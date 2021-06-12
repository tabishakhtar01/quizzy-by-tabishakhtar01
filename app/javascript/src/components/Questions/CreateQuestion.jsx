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
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.create({
        question: {
          question,
          quiz_id: id,
          options_attributes: [
            { answer: answer_one, correct_answer_id: "0" },
            { answer: answer_two, correct_answer_id: "1" },
            { answer: answer_three, correct_answer_id: "2" },
            { answer: answer_four, correct_answer_id: "3" },
          ],
          correct_answer: answer,
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
        setAnswer={setAnswer}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateQuestion;
