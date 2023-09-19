import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomForm from "../components/CreateRoomForm";
import Credits from "../components/Credits";
import JoinRoomForm from "../components/JoinRoomForm";
import { createRoom, joinRoom } from "../functions/roomService";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const HomePage = ({ setUser }: Props) => {
  const [joiningRoom, setJoiningRoom] = useState<Boolean>(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async (username: string) => {
    const room = await createRoom();
    setUser(username);
    if (room) {
      console.log(`Connected to ${room} as ${username}`);
      navigate(`/room/${room}`);
    }
  };

  const handleJoinRoom = (roomCode: string, username: string) => {
    setUser(username);

    joinRoom(roomCode)
      .then((room) => {
        // Room exists, handle it here
        console.log(room);
        navigate(`/room/${room}`);
      })
      .catch((error) => {
        // Room does not exist or there was an error, handle the error here
        console.error(error);
      });
  };

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

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center font-mono dark:bg-black">
        <p className="text-shadow mb-4 text-3xl font-bold motion-safe:animate-bounce dark:text-white md:text-5xl">
          Welcome to gssr.
        </p>
        <p className="text-shadow mb-4 text-center text-sm motion-safe:animate-bounce dark:text-white md:text-3xl line-through">
          This site doesn't actually do anything.
        </p>
        <div className="decoration-white flex justify-center items-center gap-4 text-xl md:text-3xl underline mb-4 border-black font-semibold">
          <button
            className={`text-white ${joiningRoom ? "opacity-30" : ""}`}
            onClick={joiningRoom ? adjustUI : undefined}
          >
            Create Room
          </button>
          <button
            className={`text-white ${!joiningRoom ? "opacity-30" : ""}`}
            onClick={!joiningRoom ? adjustUI : undefined}
          >
            Join Room
          </button>
        </div>
        {joiningRoom ? (
          <JoinRoomForm joinRoom={handleJoinRoom} />
        ) : (
          <CreateRoomForm createRoom={handleCreateRoom} />
        )}
        {error && <p>{error}</p>}
      </div>
      <Credits />
    </>
  );
};

export default HomePage;
