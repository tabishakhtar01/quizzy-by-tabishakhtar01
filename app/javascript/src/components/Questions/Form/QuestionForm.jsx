import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  type = "create",
  question,
  setQuestion,
  setAnswer_one,
  setAnswer_two,
  setAnswer_three,
  setAnswer_four,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Enter Your Question"
        placeholder=""
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      <Input
        label="Enter Your Answer 1"
        placeholder=""
        value={question}
        onChange={e => setAnswer_one(e.target.value)}
      />

      <Input
        label="Enter Your Answer 2"
        placeholder=""
        value={question}
        onChange={e => setAnswer_two(e.target.value)}
      />

      <Input
        label="Enter Your Answer 3"
        placeholder=""
        value={question}
        onChange={e => setAnswer_three(e.target.value)}
      />

      <Input
        label="Enter Your Answer 4"
        placeholder=""
        value={question}
        onChange={e => setAnswer_four(e.target.value)}
      />

      <Button
        type="submit"
        buttonText={type === "create" ? "Create Question" : "Update Question"}
        loading={loading}
      />
    </form>
  );
};

export default QuestionForm;
