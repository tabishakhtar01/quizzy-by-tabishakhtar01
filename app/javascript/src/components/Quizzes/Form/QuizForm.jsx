import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const QuizForm = ({
  type = "create",
  title,
  setTitle,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder=""
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Quiz" : "Update Quiz"}
        loading={loading}
      />
    </form>
  );
};

export default QuizForm;
