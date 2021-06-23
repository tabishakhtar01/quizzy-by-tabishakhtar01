import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import quizzesApi from "../../apis/quizzes";
import questionsApi from "../../apis/questions";
import optionsApi from "../../apis/options";
import { isNil, isEmpty, either } from "ramda";
import Check from "@material-ui/icons/CheckCircleTwoTone";
import EditIcon from "@material-ui/icons/Edit";

import DeleteIcon from "@material-ui/icons/DeleteOutline";

const ShowQuiz = ({ history }) => {
  const { slug } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [optionDetails, setOptionDetails] = useState([]);
  const [comb, setComb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [url, getUrl] = useState("");
  const [slugData, setSlugData] = useState("");

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizDetails(response.data.quiz);
      setSlugData(response.data.quiz.slug);
    } catch (error) {
      alert(error);
    } finally {
      setPageLoading(false);
    }
  };
  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.show(slug);
      const optionResponse = await optionsApi.list();
      setQuestions(response.data.question);
      setOptionDetails(optionResponse.data.options);
      setComb([...response.data.question, ...optionResponse.data.options]);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const CreateQuest = () => {
    history.push(`/quizzes/${slug}/show/add`);
  };

  const destroyQuestion = async id => {
    try {
      await questionsApi.destroy(id);
      await fetchQuestions();
    } catch (error) {
      // logger.error(error);
      alert(error);
    }
  };

  const updateQuestion = id => {
    history.push(`/questions/${id}/edit`);
  };

  const CreateUrl = () => {
    getUrl(window.location.href);
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestions();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  if (!either(isNil, isEmpty)(questions)) {
    return (
      <Container>
        {url && (
          <h1>
            Published, your public link is -{" "}
            <span className="underline text-blue-600">
              https://quizzy-rails.herokuapp.com/public/{slugData}
            </span>
          </h1>
        )}
        <div className="flex justify-end">
          <button
            className="relative  px-4 py-2 mx-5
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
            onClick={CreateUrl}
          >
            {" "}
            {url ? <span>Published</span> : <span>Publish</span>}
          </button>
          <button
            className="relative  px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
            onClick={CreateQuest}
          >
            {" "}
            Add Question
          </button>
        </div>
        <h1 className="mt-10 text-6xl text-gray-600">{quizDetails?.title}</h1>
        <div>
          {questions.map((curr, index) => {
            return (
              <>
                <div className="bg-gray-200 mx-10 mt-10 mb-20 rounded-xl shadow-2xl">
                  <div className="p-10">
                    <div className="flex justify-end">
                      <button
                        onClick={() => updateQuestion(curr.id)}
                        className="bg-blue-700 text-white mr-5 px-3 rounded-full hover:bg-blue-300 hover:text-blue-700"
                      >
                        <EditIcon />
                        Edit
                      </button>
                      <button
                        onClick={() => destroyQuestion(curr.id)}
                        className="bg-red-700 text-white mr-5 px-3 rounded-full hover:bg-red-300 hover:text-red-700"
                      >
                        <DeleteIcon />
                        Remove
                      </button>
                    </div>
                    <h1 className="text-3xl">
                      Question {index + 1}: {curr.question}
                    </h1>
                    {optionDetails.map(opt => {
                      if (opt.question_id === curr.id)
                        return (
                          <div>
                            <span className="m-5">
                              Option {parseInt(opt.correct_answer_id) + 1}:
                            </span>
                            <span
                              className={`text-xl my-4 ${
                                curr.correct_answer == opt.correct_answer_id
                                  ? "text-green-600"
                                  : "text-gray-700"
                              }`}
                            >
                              <span className="text-gray-700">
                                {opt.answer}{" "}
                              </span>
                              {curr.correct_answer == opt.correct_answer_id && (
                                <>
                                  <Check />
                                  Correct answer
                                </>
                              )}
                            </span>
                          </div>
                        );
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-end">
        <button
          className="relative  px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
          onClick={CreateQuest}
        >
          Add Question
        </button>
      </div>
      <h1 className="mt-10 text-6xl text-gray-600">{quizDetails?.title}</h1>
      <h1
        className="text-xl flex justify-center items-center"
        style={{ height: "50vh" }}
      >
        There are no questions in this quiz.
      </h1>
    </Container>
  );
};

export default ShowQuiz;
