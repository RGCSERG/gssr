import { useEffect, useState } from "react";

const GRID_WIDTH: number = 6;
const GRID_HEIGHT: number = 9;

type SizeVariants = {
  [key: number]: string;
};

const sizeVariants: SizeVariants = {
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
};

const Connect4 = () => {
  const [player, setPlayer] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [gameEnd, setGameEnd] = useState<boolean>(true);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    let a: number[] = [];
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
      a.push(0);
    }
    setArray(a);
    setReset(false);
    setGameEnd(false);
  }, [reset]);

  const checkForWin = (index: number): number => {
    const column: number = index % GRID_WIDTH;
    const row: number = Math.floor(index / GRID_WIDTH);
    const columnIndices = getColumnIndices(column);
    let sequentialDiscs = 1;
    //check vertical win
    for (let i = 0; i < GRID_HEIGHT; i++) {
      const currentIndex = columnIndices[i];
      array[currentIndex] == player
        ? (sequentialDiscs += 1)
        : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
    }
    //check horizontal win
    sequentialDiscs = 1;
    for (let i = 0; i < GRID_WIDTH; i++) {
      const currentIndex = row * GRID_WIDTH + i;
      array[currentIndex] == player
        ? (sequentialDiscs += 1)
        : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
    }
    sequentialDiscs = 1;
    //check left diagonals
    let startingIndex = -1;
    for (let i = 0; i < Math.max(GRID_HEIGHT, GRID_WIDTH); i++) {
      const currentRow = index - i * GRID_WIDTH;
      const currentIndex = currentRow - i;
      // console.log(`Current column: ${index % GRID_WIDTH}`);
      if (currentIndex % GRID_WIDTH === 0) {
        startingIndex = currentIndex;
        break;
      }
    }
    for (let i = 0; i < Math.max(GRID_HEIGHT, GRID_WIDTH); i++) {
      const currentRow = startingIndex + i * GRID_WIDTH;
      const currentIndex = currentRow + i;
      console.log(`Current column: ${index % GRID_WIDTH}`);
      array[currentIndex] == player
        ? (sequentialDiscs += 1)
        : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
    }
    //check right diagonals
    sequentialDiscs = 1;
    //check left diagonals
    for (let i = 0; i < Math.max(GRID_HEIGHT, GRID_WIDTH); i++) {
      const currentRow = index - i * GRID_WIDTH;
      const currentIndex = currentRow + i;
      // console.log(`Current column: ${index % GRID_WIDTH}`);
      if (currentIndex % GRID_WIDTH === GRID_WIDTH - 1) {
        startingIndex = currentIndex;
        break;
      }
    }
    for (let i = 0; i < Math.max(GRID_HEIGHT, GRID_WIDTH); i++) {
      const currentRow = startingIndex + i * GRID_WIDTH;
      const currentIndex = currentRow - i;
      console.log(`Current column: ${index % GRID_WIDTH}`);
      array[currentIndex] == player
        ? (sequentialDiscs += 1)
        : (sequentialDiscs = 1);
      if (sequentialDiscs == 4) {
        return player;
      }
    }

    return 0;
  };

  const handleMouseEnter = (index: number) => {
    if (gameEnd) return;
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
    if (gameEnd) return;
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
      setGameEnd(true);
    }
  };

  // useEffect(() => {}, [array]);

  return (
    <div>
      <h1 className="text-4xl p-4">Connect 4: {player}'s turn</h1>
      {error != "" ? (
        <h1 className="text-4xl text-red-500 p-4">{error}</h1>
      ) : null}
      {gameEnd ? (
        <button
          onClick={() => {
            setReset(true);
          }}
        >
          Reset game!
        </button>
      ) : null}
      <div className={`grid ${sizeVariants[GRID_WIDTH]} p-10`}>
        {array.map((value, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            onMouseLeave={() => setHoverIndices([])}
            key={index}
            className={`border border-black-500 h-16
            ${hoverIndices.includes(index) ? " bg-opacity-50" : null}
            ${value == 1 ? "bg-blue-500" : null}
            ${value == 2 ? "bg-red-500" : null}
          `}
          />
        ))}
      </div>
    </div>
  );
};

export default Connect4;
