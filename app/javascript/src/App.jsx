import React, { useEffect, useState } from "react";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from "helpers/storage";
import CreateQuiz from "./components/Quizzes/CreateQuiz";
import EditQuiz from "./components/Quizzes/EditQuiz";
import ShowQuiz from "./components/Quizzes/ShowQuiz";
import CreateQuestion from "./components/Questions/CreateQuestion";
import EditQuestion from "./components/Questions/EditQuestion";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authEmail = getFromLocalStorage("authEmail");
  const isLoggedIn = !either(isNil, isEmpty)(authEmail) && authEmail !== "null";

  useEffect(() => {
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/questions/:id/edit" component={EditQuestion} />
        <Route exact path="/quizzes/:id/show/add" component={CreateQuestion} />
        <Route exact path="/quizzes/:id/show" component={ShowQuiz} />
        <Route exact path="/quizzes/:id/edit" component={EditQuiz} />
        <Route exact path="/quizzes/create" component={CreateQuiz} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
