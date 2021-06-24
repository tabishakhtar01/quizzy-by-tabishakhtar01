import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import questionsApi from "apis/questions";
import PageLoader from "components/PageLoader";
import EditForm from "./Form/EditForm";
import optionsApi from "../../apis/options";

const EditQuestion = ({ history }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answer_one, setAnswer_one] = useState("");
  const [answer_two, setAnswer_two] = useState("");
  const [answer_three, setAnswer_three] = useState("");
  const [answer_four, setAnswer_four] = useState("");
  const [answer_oneId, setAnswer_oneId] = useState(null);
  const [answer_twoId, setAnswer_twoId] = useState(null);
  const [answer_threeId, setAnswer_threeId] = useState(null);
  const [answer_fourId, setAnswer_fourId] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await questionsApi.update({
        id,
        payload: {
          question: {
            question,
            options_attributes: [
              { id: answer_oneId, answer: answer_one, correct_answer_id: "0" },
              { id: answer_twoId, answer: answer_two, correct_answer_id: "1" },
              answer_three.length > 0 && {
                id: answer_threeId,
                answer: answer_three,
                correct_answer_id: "2",
              },
              answer_four.length > 0 && {
                id: answer_fourId,
                answer: answer_four,
                correct_answer_id: "3",
              },
            ],
            correct_answer: answer,
          },
        },
      });

      setLoading(false);
      history.push(`/dashboard`);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const fetchQuestionDetails = async () => {
    const response = await questionsApi.list();
    const optResponse = await optionsApi.show(id);
    setAnswer_one(optResponse.data.option[0].answer);
    setAnswer_oneId(optResponse.data.option[0].id);
    setAnswer_two(optResponse.data.option[1].answer);
    setAnswer_twoId(optResponse.data.option[1].id);
    if (
      optResponse.data.option.length == 3 ||
      optResponse.data.option.length == 4
    ) {
      setAnswer_three(optResponse.data.option[2].answer);
      setAnswer_threeId(optResponse.data.option[2].id);
    }
    if (optResponse.data.option.length == 4) {
      setAnswer_four(optResponse.data.option[3].answer);
      setAnswer_fourId(optResponse.data.option[3].id);
    }
    const data = response.data.questions;
    data.map(question => {
      if (question.id == id) {
        setQuestion(question.question);
      }
    });
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
        answer_one={answer_one}
        setAnswer_one={setAnswer_one}
        answer_two={answer_two}
        setAnswer_two={setAnswer_two}
        answer_three={answer_three}
        setAnswer_three={setAnswer_three}
        answer_four={answer_four}
        setAnswer_four={setAnswer_four}
        answer={answer}
        setAnswer={setAnswer}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditQuestion;
