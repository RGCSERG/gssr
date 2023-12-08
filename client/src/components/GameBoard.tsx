import React, { useEffect, useState } from "react";
import { boolean, number } from "zod";

const GameBoard = () => {
  const [player, setPlayer] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    let a: number[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        a.push(0);
      }
    }
    setArray(a);
  }, [reset]);

  const checkForWin = (index: number): number => {
    const column: number = index % 9;
    const row: number = Math.floor(index / 9);
    const columnIndices = getColumnIndices(column);
    //check horizontals
    //best solution is just check the whole row and column and see if we get a > 4 combo
    let sequentialDiscs = 1;
    // console.log(
    //   `${columnIndices} player: ${player} sequential ${sequentialDiscs}`
    // );
    columnIndices.forEach((value) => {
      array[value] == player
        ? (sequentialDiscs = sequentialDiscs + 1)
        : (sequentialDiscs = 1);
      // console.log(array[value]);
      if (sequentialDiscs == 4) {
        console.log("4 in a row detected: breaking");
      }
    });
    if (sequentialDiscs == 4) {
      return player;
    }
    console.log(sequentialDiscs);
    sequentialDiscs = 1;

    return 0;
  };

  const handleMouseEnter = (index: number) => {
    const column: number = index % 9;
    const indices: number[] = getColumnIndices(column);
    // console.log("Column:" + column, "Indices:", indices);
    setHoverIndices(indices);
  };

  const getColumnIndices = (column: number): number[] => {
    let array: number[] = [];
    for (let i = 0; i < 9; i++) {
      const num: number = column + 9 * i;
      array.push(num);
    }
    return array;
  };

  const handleClick = (id: number) => {
    setError("");

    const column: number = id % 9;

    const indices: number[] = getColumnIndices(column);
    let emptySlot: number = -1;
    indices.map((value) => {
      if (array[value] == 0) {
        emptySlot = value;
      }
    });

    let selectedIndex = -1;

    const newArray = array.map((value, index) => {
      if (index == emptySlot) {
        if (value == 0) {
          player === 1 ? setPlayer(2) : setPlayer(1);
          // console.log("Found empty emptySlot at index: " + emptySlot);
          selectedIndex = index;
          return player;
        } else {
          return value;
        }
      } else {
        if (emptySlot == -1) {
          setError("Please choose a non full column");
        }
        return value;
      }
    });
    // Update the state with the new array
    setArray(newArray);
    let winResult = 0;
    if (selectedIndex != -1) {
      winResult = checkForWin(selectedIndex);
    }
    if (winResult == 1 || winResult == 2) {
      setError(`${winResult} wins the game!`);
      setReset(!reset);
    }
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
