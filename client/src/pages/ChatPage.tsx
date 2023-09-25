import { useNavigate, useParams } from "react-router-dom";
import ClipboardCopyButton from "../components/ClipboardCopyButton";
import MakeChangesModal from "../components/MakeChangesModal";
import MessageInputBox from "../components/MessageInputBox";
import RoomMessages from "../components/RoomMessages";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user: string;
}

const ChatPage = ({ user, setUser }: Props) => {
  const { room } = useParams();

  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <div className="flex gap-5 items-center justify-self-start w-1/2 text-left">
        <h1 className="font-semibold text-5xl outline p-3 w-fit bg-white">
          Lobby {room}
        </h1>
        <ClipboardCopyButton />
        <button
          className="text-2xl underline text-blue-500"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Return home
        </button>
      </div>

      <RoomMessages user={user} />

      <MessageInputBox user={user} />

      {!user && <MakeChangesModal setUser={setUser} roomCode={room} />}
    </div>
  );
};

export default ChatPage;
