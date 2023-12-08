import { useEffect, useState } from "react";

const GameBoard = () => {
  const GRID_WIDTH: number = 6;
  const GRID_HEIGHT: number = 9;
  const [player, setPlayer] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    let a: number[] = [];
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
      a.push(0);
    }
    setArray(a);
  }, [reset]);

  const checkForWin = (index: number): number => {
    const column: number = index % GRID_WIDTH;
    const row: number = Math.floor(index / GRID_WIDTH);
    const columnIndices = getColumnIndices(column);
    let sequentialDiscs = 1;
    //check vertical win
    for (let i = 0; i < GRID_HEIGHT; i++) {
      index = columnIndices[i];
      array[index] == player ? (sequentialDiscs += 1) : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
    }
    //check horizontal win
    sequentialDiscs = 1;
    for (let i = 0; i < GRID_WIDTH; i++) {
      index = row * GRID_WIDTH + i;
      array[index] == player ? (sequentialDiscs += 1) : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
      console.log(index);
    }
    sequentialDiscs = 1;
    //check diagonals

    return 0;
  };

  const handleMouseEnter = (index: number) => {
    const column: number = index % GRID_WIDTH;
    const indices: number[] = getColumnIndices(column);
    setHoverIndices(indices);
  };

  const getColumnIndices = (column: number): number[] => {
    let array: number[] = [];
    for (let i = 0; i < GRID_HEIGHT; i++) {
      const num: number = column + GRID_WIDTH * i;
      array.push(num);
    }
    return array;
  };

  const handleClick = (id: number) => {
    setError("");

    const column: number = id % GRID_WIDTH;

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
      <div className={`grid grid-cols-${GRID_WIDTH} p-10`}>
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
