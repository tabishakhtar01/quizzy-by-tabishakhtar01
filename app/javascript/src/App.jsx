import React, { useEffect, useState } from "react";
// ----previous imports if any----
// import Signup from "components/Authentication/Signup";
import Signup from "./components/Authentication/Signup";
// import PageLoader from "components/PageLoader"
// import {setAuthHeaders} from "apis/axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     setAuthHeaders(setLoading);
  //   }, []);

  //   if (loading) {
  //     return (
  //       <div className="h-screen">
  //         <PageLoader />
  //       </div>
  //     );
  //   }

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

export default App;
