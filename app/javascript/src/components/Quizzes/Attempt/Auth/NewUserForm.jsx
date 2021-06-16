import React from "react";
import Input from "components/Input";
import Button from "components/Button";
const NewUserForm = ({
  handleSubmit,
  setFirstName,
  setLastName,
  setEmail,
  loading,
}) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen px-4
    py-12 sm:px-6 lg:px-8 bg-gray-50 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-3xl font-extrabold leading-9
        text-center text-bb-gray-700 text-gray-900"
        >
          Share your info
        </h2>
        <div className="text-center"></div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            placeholder="Sam"
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            type="email"
            label="Email"
            placeholder="sam@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" buttonText="Next" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
