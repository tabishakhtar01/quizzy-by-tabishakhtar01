import React, { useState } from "react";
import RegisterForm from "./NewUserForm";
import { useParams } from "react-router";
import usersApi from "../../../../apis/users";

const NewUser = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
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
