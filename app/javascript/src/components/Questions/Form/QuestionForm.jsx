import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  type = "create",
  question,
  setQuestion,
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
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Question" : "Update Question"}
        loading={loading}
      />
    </form>
  );
};

export default QuestionForm;
