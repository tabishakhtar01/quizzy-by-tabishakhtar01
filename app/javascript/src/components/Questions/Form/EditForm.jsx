import React, { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  type = "create",
  question,
  setQuestion,
  setAnswer_one,
  answer_one,
  setAnswer_two,
  answer_two,
  setAnswer_three,
  answer_three,
  setAnswer_four,
  answer_four,
  setAnswer,
  answer,
  threeData,
  fourData,
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
        label="Option 1"
        placeholder=""
        value={answer_one}
        onChange={e => setAnswer_one(e.target.value)}
      />

      <Input
        label="Option 2"
        placeholder=""
        value={answer_two}
        onChange={e => setAnswer_two(e.target.value)}
      />

      {threeData && (
        <Input
          label="Option 3"
          placeholder=""
          value={answer_three}
          onChange={e => setAnswer_three(e.target.value)}
        />
      )}

      {fourData && (
        <Input
          label="Option 4"
          placeholder=""
          value={answer_four}
          onChange={e => setAnswer_four(e.target.value)}
        />
      )}

      <div className="flex justify-between mt-5">
        <h1 className="w-3/5 mt-2">Choose Correct Option</h1>
        <div className="flex justify-end container-fluid w-2/5 md:container">
          <div className="inline-flex relative">
            <svg
              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 
                    25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 
                    9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select
              className="border border-gray-500 rounded-full text-gray-800 h-10 pl-5 pr-10 
                    bg-white hover:border-gray-400 focus:outline-none appearance-none"
              onChange={e => setAnswer(e.target.value)}
            >
              <option>Select Option</option>
              {answer_one.length > 0 && <option value="0">Option 1</option>}
              {answer_two.length > 0 && <option value="1">Option 2</option>}
              {answer_three.length > 0 && <option value="2">Option 3</option>}
              {answer_four.length > 0 && <option value="3">Option 4</option>}
            </select>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        buttonText={type === "create" ? "Create Question" : "Update Question"}
        loading={loading}
      />
    </form>
  );
};

export default QuestionForm;
