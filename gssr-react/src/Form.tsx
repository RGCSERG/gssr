import { useState } from "react";

interface Props {
  placehold: string;
  name: string;
}

const Form = ({ placehold }: Props) => {
  const [Value, setValue] = useState("");
  return (
    <input
      className="border-solid border-4 border-black 
       focus:outline-none w-1/3 h-20 p-5 rounded-md text-xl dark:border-white dark:bg-black dark:text-white"
      placeholder={placehold}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Form;
