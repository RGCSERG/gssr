import React, { useEffect, useState } from "react";

const GameBoard = () => {
  let a: number[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      a.push(0);
    }
  }

  const [array, updateArray] = useState<number[]>(a);

  const handleClick = (id: number) => {
    // Create a new array with the updated value
    const newArray = array.map((value, index) =>
      index === id ? value + 1 : value
    );
    // Update the state with the new array
    updateArray(newArray);
  };

  // useEffect(() => {}, [array]);

  return (
    <div className="grid grid-cols-9">
      {array.map((value, index) => (
        <div
          key={index}
          className="border border-red-500 h-16"
          onClick={() => handleClick(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
