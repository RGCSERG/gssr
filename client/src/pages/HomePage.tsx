import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import CreateRoomForm from "../components/CreateRoomForm";
import Credits from "../components/Credits";
import JoinRoomForm from "../components/JoinRoomForm";

interface Props {
  socket: Socket;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const HomePage = ({ socket, setUser }: Props) => {
  const [joiningRoom, setJoiningRoom] = useState<Boolean>(false);

  useEffect(() => {
    //works
    joiningRoom === true
      ? console.log("Joining room")
      : console.log("Creating room");
  }, [joiningRoom]);

  const adjustUI = () => {
    setJoiningRoom(!joiningRoom);
  };

  const navigate = useNavigate();

  const joinRoom = (roomCode: number, username: string) => {
    setUser(username);
    console.log(`Connected to ${roomCode} as ${username}`);
    navigate(`/room/${roomCode}`);
    // socket.emit("join_room", roomCode);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center font-mono dark:bg-black">
        <p className="text-shadow mb-4 text-3xl font-bold motion-safe:animate-bounce dark:text-white md:text-5xl">
          Welcome to gssr.
        </p>
        <p className="text-shadow mb-4 text-center text-sm motion-safe:animate-bounce dark:text-white md:text-3xl line-through">
          This site doesn't actually do anything.
        </p>

        {joiningRoom === true ? (
          <>
            <div className="flex justify-center items-center gap-4  text-2xl md:text-3xl mb-4 underline font-semibold">
              <button className="opacity-30" onClick={adjustUI}>
                Create Room
              </button>
              <button>Join Room</button>
            </div>
            <JoinRoomForm joinRoom={joinRoom} />
          </>
        ) : (
          <>
            <div className="flex justify-center items-center gap-4 text-xl md:text-3xl underline mb-4 border-black font-semibold">
              <button>Create Room</button>
              <button className="opacity-30" onClick={adjustUI}>
                Join Room
              </button>
            </div>
            <CreateRoomForm socket={socket} joinRoom={joinRoom} />
          </>
        )}
      </div>
      <Credits />
    </>
  );
};

export default HomePage;
