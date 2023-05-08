import { useState } from "react";

interface Props {
  placehold: string;
  name: string;
}

const InputField = ({ placehold }: Props) => {
  const [Value, setValue] = useState("");
  return (
    <input
      className="text-shadow shadow- lg
       h-20 w-1/3 select-none rounded-md border-4 border-solid border-black p-5
       text-xl focus:outline-none dark:border-white dark:bg-black dark:text-white"
      placeholder={placehold}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default InputField;
