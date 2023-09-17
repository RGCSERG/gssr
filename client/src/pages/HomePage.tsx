import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import CreateRoomForm from "../components/CreateRoomForm";
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
      {joiningRoom === true ? (
        <>
          <button onClick={adjustUI}>Create Room</button>
          <button>Join Room</button>
          <JoinRoomForm joinRoom={joinRoom} />
        </>
      ) : (
        <>
          <button>Create Room</button>
          <button onClick={adjustUI}>Join Room</button>
          <CreateRoomForm socket={socket} joinRoom={joinRoom} />
        </>
      )}
    </>
  );
};

export default HomePage;
