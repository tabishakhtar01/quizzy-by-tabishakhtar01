// import React from "react";
// import Container from "components/Container";
// import Button from 'components/Button'

// const Dashboard = () => {
//   return (
//     <Container>
//       <div className='flex justify-end'>
//       <Button type="submit" buttonText="Add new quiz" loading={false} />

//       </div>
//       <h1 className="text-xl leading-5 flex justify-center items-center h-screen">You have not created any quiz</h1>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import Button from "components/Button";
import Container from "components/Container";
import ListQuizzes from "components/Quizzes/ListQuizzes";
import PageLoader from "components/PageLoader";
import quizzesApi from "apis/quizzes";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(quizzes)) {
    return (
      <Container>
        <div className="flex justify-end">
          <Button type="submit" buttonText="Add new quiz" loading={loading} />
        </div>
        <h1 className="text-6xl">List of quizzes</h1>
        <ListQuizzes data={quizzes} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-end">
        <Button type="submit" buttonText="Add new quiz" loading={loading} />
      </div>
      <h1 className="text-xl leading-5 text-center">
        You have not created any quiz
      </h1>
    </Container>
  );
};

export default Dashboard;
