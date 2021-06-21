import React, { useState } from "react";
import RegisterForm from "./NewUserForm";
import { useParams } from "react-router";
import usersApi from "../../../../apis/users";
import quizzesApi from "../../../../apis/quizzes";
import attemptsApi from "../../../../apis/attempts";
import { useEffect } from "react";

const NewUser = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quizId, setQuizId] = useState();
  const [isSuccess, setIsSuccess] = useState("");
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchQuizId = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizId(response.data.quiz.id);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await usersApi.create({
        user: {
          first_name: firstName,
          last_name: lastname,
          email,
          password: "user@quizzyapp",
          password_confirmation: "user@quizzyapp",
        },
      });
      const submitResponse = await attemptsApi.create({
        attempt: {
          quiz_id: quizId,
          slug_data: slug,
          submitted: false,
        },
      });
      setIsSuccess(submitResponse.data.notice);
      history.push(`/public/${slug}/attempt/new/quiz`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    fetchQuizId();
  });

  return (
    <RegisterForm
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default NewUser;
