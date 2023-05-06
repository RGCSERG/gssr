import React from "react";

interface Props {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <button className="outline outline-4 outline-black w-1/6 h-16 text-2xl rounded-full hover:bg-slate-200">
      {name}
    </button>
  );
};

export default Button;
