import React, { useState } from "react";
import { setToLocalStorage } from "helpers/storage";
import LoginForm from "components/Authentication/Form/LoginForm";
import authApi from "apis/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        email,
        userId: response.data.user_id,
        userFirstName: response.data.user_first_name,
      });
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
