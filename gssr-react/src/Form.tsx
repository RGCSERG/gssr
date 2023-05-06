import { useState } from "react";

interface Props {
  placehold: string;
}

const Form = ({ placehold }: Props) => {
  const [Value, setValue] = useState("");
  return (
    <input
      className="border-solid border-4 border-black hover:bg-slate-200 focus:outline-none w-1/3 h-20 p-5 rounded-md text-xl"
      placeholder={placehold}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Form;
