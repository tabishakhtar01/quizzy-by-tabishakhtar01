import React, { useState } from "react";

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
  const [inputcount, SetInputCount] = useState(0);
  const AddInput = () => {
    SetInputCount(inputcount + 1);
  };
  const deleteField = () => {
    SetInputCount(1);
  };
  const clearAll = () => {
    SetInputCount(0);
  };

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
        value={question}
        onChange={e => setAnswer_one(e.target.value)}
      />

      <Input
        label="Option 2"
        placeholder=""
        value={question}
        onChange={e => setAnswer_two(e.target.value)}
      />

      {inputcount === 1 ? (
        <>
          <Input
            label="Option 3"
            placeholder=""
            value={question}
            onChange={e => setAnswer_three(e.target.value)}
          />
          <button
            className="bg-red-600 text-white mt-5 mr-5 px-3 rounded"
            onClick={clearAll}
          >
            Remove
          </button>
        </>
      ) : (
        inputcount === 2 && (
          <>
            <Input
              label="Option 3"
              placeholder=""
              value={question}
              onChange={e => setAnswer_three(e.target.value)}
            />
            <button
              className="bg-red-600 text-white mt-5 mr-5 px-3 rounded"
              onClick={deleteField}
            >
              Remove
            </button>

            <Input
              label="Option 4"
              placeholder=""
              value={question}
              onChange={e => setAnswer_four(e.target.value)}
            />
            <button
              className="bg-red-600 text-white mt-5 mr-5 px-3 rounded"
              onClick={deleteField}
            >
              Remove
            </button>
          </>
        )
      )}
      {inputcount < 2 && (
        <button
          className="mt-5 bg-blue-600 text-white px-3 rounded"
          onClick={AddInput}
        >
          Add Option
        </button>
      )}
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Question" : "Update Question"}
        loading={loading}
      />
    </form>
  );
};

export default QuestionForm;

// import React, { useState } from "react";

// function App()
// {
//   const [fields,setFields] = useState([{value: null}])

//   function handleChange(i, event) {
//     const values = [...fields]
//     values[i].value = event.target.value
//     setFields(values)
//   }

//   function handleAdd() {
//     const values = [...fields]
//     values.push([{value: null}])
//     setFields(values)
//     console.log(fields)
//     setAnswer_one(fields[0].value)
//     setAnswer_two(fields[1].value)
//     setAnswer_three(fields[2].value)
//     setAnswer_four(fields[3].value)

//   }

//   function handleRemove(i) {
//     const values = [...fields]
//     values.splice(i, 1)
//     setFields(values)
//   }

//   return (
//     <>
//     <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>

//   <Input
//          label="Enter Your Question"
//          placeholder=""
//          value={question}
//          onChange={e => setQuestion(e.target.value)}
//        />

//     {fields.map((field,idx)=> {
//       return (
//         <div key={`${field}-${idx}`}>
//           <input
//             type='text'
//             placeholder='Option'
//             value={field.value || ''}
//             id ={'inputfield' + `${idx}`}
//             onChange={(e)=> handleChange(idx, e)}
//             />

//           {fields.length <= 2 ? (
//             ""
//           ):
//           (
//             <button
//             className=''
//             type='button'
//             onClick={()=> handleRemove(idx)}
//             > X </button>
//           )}
//         </div>
//       )
//     })}
//     {fields.length < 4 ?
//     <button onClick={handleAdd}>Add</button> : ''
//         }
//                <Button
//          type="submit"
//          buttonText={type === "create" ? "Create Question" : "Update Question"}
//          loading={loading}
//        />
//         </form>
//       </>
//   )

// }

// export default QuestionForm
