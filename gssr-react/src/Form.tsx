import { useState } from "react";

const Form = () => {
  const [Username, setUsername] = useState("");
  return (
    <>
      <input
        className="border-solid border-2 border-sky-500 hover:border-sky-700 focus:outline-none w-1/6 h-10"
        placeholder="Enter a value"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {Username !== "" && <p>Current username: {Username}</p>}
      <button className="bg-sky-500 hover:bg-sky-700 text-white p-1 rounded-sm w-1/12">
        Continue
      </button>
    </>
  );
};

export default Form;
