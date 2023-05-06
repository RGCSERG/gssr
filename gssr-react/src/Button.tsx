import React from "react";

interface Props {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <button className="bg-sky-500 hover:bg-sky-700 text-white p-1 rounded-sm w-1/6 h-20 font-medium text-3xl">
      {name}
    </button>
  );
};

export default Button;
