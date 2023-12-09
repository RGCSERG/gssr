import { useEffect, useState } from "react";

const GRID_WIDTH: number = 9;
const GRID_HEIGHT: number = 9;
const room = 5173;

type SizeVariants = {
  [key: number]: string;
};

const widthVariants: SizeVariants = {
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
};

const heightVariants: SizeVariants = {
  6: "grid-rows-6",
  7: "grid-rows-7",
  8: "grid-rows-8",
  9: "grid-rows-9",
};

const Connect4 = () => {
  const [player, setPlayer] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hoverIndices, setHoverIndices] = useState<number[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [winner, setWinner] = useState<number>(0);
  const [array, setArray] = useState<number[]>([]);
  const [turnCount, setTurnCount] = useState<number>(0);

  useEffect(() => {
    let a: number[] = [];
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
      a.push(0);
    }
    setArray(a);
    setReset(false);
    setWinner(0);
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
    if (winner) return;
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
    if (winner) return;
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
          //code when successful selection
          player === 1 ? setPlayer(2) : setPlayer(1);
          // console.log("Found empty emptySlot at index: " + emptySlot);
          selectedIndex = index;
          setTurnCount(() => {
            return turnCount + 1;
          });
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
      setWinner(winResult);
    }
  };

  // useEffect(() => {}, [array]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <nav className="h-20 flex justify-center gap-4 items-center w-full">
        <h1 className="text-4xl">GSSR room: {room}</h1>
        {winner !== 0 ? (
          <h1>{winner} is the winner</h1>
        ) : (
          <h1 className="text-4xl">
            Player {player}'s turn, Turn: {turnCount}
          </h1>
        )}
        {error != "" ? (
          <h1 className="text-4xl text-red-500">{error}</h1>
        ) : null}
        {winner ? (
          <button
            onClick={() => {
              setReset(true);
            }}
          >
            Reset game!
          </button>
        ) : null}
      </nav>
      <div
        className={`grid ${widthVariants[GRID_WIDTH]} ${heightVariants[GRID_HEIGHT]} outline w-2/3 md:w-3/4 lg:w-1/3`}
      >
        {array.map((value, index) => (
          <div
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            onMouseLeave={() => setHoverIndices([])}
            key={index}
            className={`border border-black-500 aspect-square
              ${hoverIndices.includes(index) ? " bg-opacity-50" : null}
            `}
          >
            <div
              className={`rounded-full w-full h-full
                ${value == 1 ? "bg-blue-500" : null}
                ${value == 2 ? "bg-red-500" : null}
        
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect4;
