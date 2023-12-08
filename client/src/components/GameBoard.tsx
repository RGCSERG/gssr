import React, { useEffect, useState } from "react";
import { number } from "zod";

const GameBoard = () => {
  let a: number[] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      a.push(0);
    }
  }

  const [player, setPlayer] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);

  const [array, updateArray] = useState<number[]>(a);

  const handleMouseEnter = (index: number) => {
    const column: number = index % 9;
    const indices: number[] = getIndices(column);
    console.log("Column:" + column, "Indices:", indices);
    setHoverIndices(indices);
  };

  const getIndices = (column: number): number[] => {
    let array: number[] = [];
    for (let i = 0; i < 9; i++) {
      const num: number = column + 9 * i;
      array.push(num);
    }
    return array;
  };

  const getEmptySlot = (indices: number[]): number => {
    let slot: number = -1;
    indices.map((value) => {
      if (array[value] == 0) {
        slot = value;
      }
    });
    return slot;
  };

  const handleClick = (id: number) => {
    const column: number = id % 9;

    const indices: number[] = getIndices(column);
    const slot: number = getEmptySlot(indices);

    const newArray = array.map((value, index) => {
      if (index == slot) {
        if (value == 0) {
          player === 1 ? setPlayer(2) : setPlayer(1);
          // console.log("Found empty slot at index: " + slot);
          return player;
        } else {
          return value;
        }
      } else {
        if (slot == -1) {
          setError("Please choose a non full column");
        }
        return value;
      }
    });
    // Update the state with the new array
    updateArray(newArray);
  };

  // useEffect(() => {}, [array]);

  return (
    <div>
      <h1 className="text-4xl p-4">Connect 4: {player}'s turn</h1>
      {error != "" ? (
        <h1 className="text-4xl text-red-500 p-4">{error}</h1>
      ) : null}
      <div className="grid grid-cols-9 p-10">
        {array.map((value, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            onMouseLeave={() => setHoverIndices([])}
            key={index}
            className={`border border-black-500 h-16
            ${value == 1 ? "bg-blue-500" : null}
            ${value == 2 ? "bg-red-500" : null}
            ${
              hoverIndices.includes(index) ? "bg-slate-200 bg-opacity-50" : null
            }
          `}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
