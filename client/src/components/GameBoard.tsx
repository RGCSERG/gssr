import React, { useEffect, useState } from "react";

const GameBoard = () => {
  let a: number[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      a.push(0);
    }
  }

  const [player, setPlayer] = useState<number>(1);

  const [array, updateArray] = useState<number[]>(a);

  const handleClick = (id: number) => {
    player === 1 ? setPlayer(2) : setPlayer(1);
    // Create a new array with the updated value
    const newArray = array.map((value, index) =>
      index === id ? (player === 1 ? (value = 1) : (value = 2)) : value
    );
    // Update the state with the new array
    updateArray(newArray);

    console.log(`Altered tile ${id}`);
  };

  // useEffect(() => {}, [array]);

  return (
    <div>
      <h1 className="text-4xl p-4">Connect 4: {player}'s turn</h1>
      <div className="grid grid-cols-9 p-10">
        {array.map((value, index) => (
          <div
            key={index}
            className={`border border-black-500 h-16
            ${value == 1 ? "bg-blue-500" : null}
            ${value == 2 ? "bg-red-500" : null}
          `}
            onClick={() => handleClick(index)}
          >
            {}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
