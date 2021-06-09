import React, { useState } from "react";
import SignupForm from "components/Authentication/Form/SignupForm";
import authApi from "apis/auth";
import { setToLocalStorage } from "helpers/storage";

const Signup = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.signup({
        user: {
          first_name: firstName,
          last_name: lastname,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setToLocalStorage({
        email,
        userId: response.data.user_id,
        userFirstName: response.data.user_first_name,
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      //   logger.error(error);
      alert(error);
    }
  };
  return (
    <SignupForm
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
