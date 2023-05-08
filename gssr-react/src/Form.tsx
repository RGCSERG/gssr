import { useState } from "react";

interface Props {
  placehold: string;
  name: string;
}

const Form = ({ placehold }: Props) => {
  const [Value, setValue] = useState("");
  return (
    <input
      className="text-shadow h-20 w-1/3 
       rounded-md border-4 border-solid border-black p-5 text-xl shadow-lg focus:outline-none dark:border-white dark:bg-black dark:text-white"
      placeholder={placehold}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Form;
