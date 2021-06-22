import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import quizzesApi from "../../../apis/quizzes";
import questionsApi from "../../../apis/questions";
import optionsApi from "../../../apis/options";
import { isNil, isEmpty, either, update } from "ramda";
import usersApi from "../../../apis/users";
import Check from "@material-ui/icons/CheckCircleTwoTone";
import attemptsApi from "../../../apis/attempts";

const AttemptQuiz = ({ history }) => {
  const { slug } = useParams();
  const [quizDetails, setQuizDetails] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [optionDetails, setOptionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSelected, getIsSelected] = useState("");
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState([]);
  const [val, setValue] = useState([]);
  var [count, setCount] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  const [quizId, setQuizId] = useState();

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      setUserId(response.data.users.slice(-1)[0].id);
      setFirstName(response.data.users.slice(-1)[0].first_name);
      setLastName(response.data.users.slice(-1)[0].last_name);
      setEmail(response.data.users.slice(-1)[0].email);
      const submitResponse = await attemptsApi.list();
    } catch (error) {
      alert(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchIsSubmitted = async () => {
    const submitResponse = await attemptsApi.list();
    setSub(submitResponse.data.attempts.slice(-1)[0].submitted);
  };

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const radioData = [...fields];
    radioData.push({ question_id: name, answer: value });
    setFields(radioData);
  }

  //After submit logic
  const handleSubmit = async () => {
    setValue(arr1);
    setIsSubmitted(true);

    //Sorted the input array in ascending order
    let sortedData = arr1.sort((a, b) =>
      parseInt(a.question_id) > parseInt(b.question_id) ? 1 : -1
    );
    var selectedOptions = [];

    //Pushing the index which will be true for choosen option and the correct option
    sortedData.map((val, ind) => {
      if (sortedData[ind].answer == questions[ind].correct_answer) {
        selectedOptions.push([ind]);
      }
    });
    setCount(selectedOptions.length);

    // After Submit -> submitted to true
    const submitResponse = await attemptsApi.list();

    try {
      const updt = await attemptsApi.update({
        slug,
        payload: { attempt: { submitted: true } },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  //getting unique radio input selection
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }
  const arr1 = getUniqueListBy(fields, "question_id");

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizDetails(response.data.quiz);
      setQuizId(response.data.quiz.id);
      setQuizName(response.data.quiz.title);
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
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestions();
    fetchUserDetails();
    fetchIsSubmitted();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  if (!either(isNil, isEmpty)(questions)) {
    return (
      <>
        {sub ? (
          <h1 className="text-center text-6xl text-gray-700">
            You cant give the test more than one time, <br /> Please close the
            window.
          </h1>
        ) : (
          <>
            <nav className="bg-white border-b">
              <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <h1 className="font-sans text-3xl font-semibold">Quizzy</h1>
                </div>
              </div>
            </nav>
            <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="mt-10 text-6xl text-gray-600">
                  {quizDetails?.title}
                </h1>
                <div>
                  {questions.map((curr, index) => {
                    return (
                      <>
                        <div className="bg-gray-200 mx-10 mt-10 mb-20 rounded-xl shadow-2xl">
                          <div className="p-10">
                            <h1 className="text-3xl">
                              Question {index + 1}: {curr.question}
                            </h1>
                            {optionDetails.map(opt => {
                              if (opt.question_id === curr.id)
                                return (
                                  <div>
                                    <span className="m-5">
                                      Option{" "}
                                      {parseInt(opt.correct_answer_id) + 1}:
                                    </span>
                                    {!isSubmitted ? (
                                      <span className="text-xl text-gray-700">
                                        <input
                                          className="my-2"
                                          type="radio"
                                          value={opt.correct_answer_id}
                                          name={curr.id}
                                          id={opt.id}
                                          onChange={e => handleChange(e)}
                                        />
                                        <label
                                          className="m-2"
                                          htmlFor={opt.id}
                                          name={opt.id}
                                        >
                                          {opt.answer}
                                        </label>
                                      </span>
                                    ) : (
                                      <>
                                        {val.map(value => {
                                          if (
                                            value.question_id == curr.id &&
                                            value.answer == curr.correct_answer
                                          ) {
                                            return (
                                              <>
                                                <span
                                                  className={`${
                                                    opt.correct_answer_id ==
                                                    curr.correct_answer
                                                      ? "text-green-700"
                                                      : "text-gray-700"
                                                  } text-xl my-2`}
                                                >
                                                  {opt.answer}
                                                </span>
                                                {curr.correct_answer ==
                                                  opt.correct_answer_id && (
                                                  <span className="text-green-600">
                                                    <Check />
                                                    Correct answer
                                                  </span>
                                                )}
                                              </>
                                            );
                                          } else if (
                                            value.question_id == curr.id
                                          ) {
                                            return (
                                              <>
                                                <span
                                                  className={`${
                                                    value.answer ==
                                                    opt.correct_answer_id
                                                      ? "line-through text-red-500"
                                                      : "text-gray-700"
                                                  } text-xl my-2`}
                                                >
                                                  {opt.answer}
                                                </span>
                                                {curr.correct_answer ==
                                                  opt.correct_answer_id && (
                                                  <span className="text-green-600">
                                                    <Check />
                                                    Correct answer
                                                  </span>
                                                )}
                                              </>
                                            );
                                          }
                                        })}
                                      </>
                                    )}
                                  </div>
                                );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                {isSubmitted && (
                  <h1 className="text-center text-2xl text-gray-700 mb-10">
                    Thank You for taking the quiz, here are your results.
                    <br />
                    You have given {count} correct and {arr1.length - count}{" "}
                    incorrect answers
                  </h1>
                )}
                {!isSubmitted && questions.length == arr1.length && (
                  <div className="flex justify-center mb-20">
                    <button
                      className="relative  px-20 py-4
        text-xl font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-full
         group hover:bg-opacity-90 focus:outline-none"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <Container>
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

export default AttemptQuiz;
