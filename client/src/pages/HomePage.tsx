import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateRoomForm from "../components/CreateRoomForm";
import Credits from "../components/Credits";
import JoinRoomForm from "../components/JoinRoomForm";
import useMessageList from "../hooks/useMessageList";
import useRoom from "../hooks/useRoom";
import { CreateRoomFormData } from "../interfaces/Rooms/CreateRoom";
import { useAuth } from "../contexts/OauthProviderContext";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const HomePage = ({ setUser }: Props) => {
  const [joiningRoom, setJoiningRoom] = useState<Boolean>(false);
  const { fetchNewRoomCode, joinRoom } = useRoom();
  const { setMessageList } = useMessageList();
  const { loginWithGitHub, user } = useAuth();
  const [isLoggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMessageList([]);
  }, []);

  const handleCreateRoom = async (formData: CreateRoomFormData) => {
    try {
      const roomCode = await fetchNewRoomCode();
      console.log(`Connected to ${roomCode} as ${formData.username}`);
      setUser(formData.username);
      navigate(`/room/${roomCode}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = async (roomCode: string, username: string) => {
    setUser(username);
    navigate(`/room/${roomCode}`);
    const messageHistory = await joinRoom(roomCode);
    setMessageList(messageHistory);
  };

  const adjustUI = () => {
    setJoiningRoom(!joiningRoom);
  };

  const handleLoginWithGitHub = () => {
    setJoiningRoom(true);
    loginWithGitHub();
  };

  return (
    <div className={"stuff"}>
      {user && user}
      <div className="flex h-screen flex-col items-center justify-center font-mono dark:bg-black">
        <p className="text-shadow mb-4 text-3xl font-bold motion-safe:animate-bounce dark:text-white md:text-5xl">
          Welcome to gssr.
        </p>
        <p className="text-shadow mb-4 text-center text-sm motion-safe:animate-bounce dark:text-white md:text-3xl line-through">
          This site doesn't actually do anything.
        </p>
        <div className="decoration-white flex justify-center items-center gap-4 text-xl md:text-3xl underline mb-4 border-black font-semibold">
          <button
            className={`dark:text-white ${joiningRoom ? "opacity-30" : ""}`}
            onClick={joiningRoom ? adjustUI : undefined}
          >
            Create Room
          </button>
          <button
            className={`dark:text-white ${!joiningRoom ? "opacity-30" : ""}`}
            onClick={!joiningRoom ? adjustUI : undefined}
          >
            Join Room
          </button>
          <button className="dark:text-white" onClick={handleLoginWithGitHub}>
            Login
          </button>
        </div>
        {joiningRoom ? (
          <JoinRoomForm joinRoom={handleJoinRoom} />
        ) : (
          <CreateRoomForm createRoom={handleCreateRoom} />
        )}
      </div>
      <Credits />
    </div>
  );
};

export default HomePage;
