import { HiOutlineHome } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import ClipboardCopyButton from "../components/ClipboardCopyButton";
import MakeChangesModal from "../components/MakeChangesModal";
import MessageInputBox from "../components/MessageInputBox";
import RoomMessages from "../components/RoomMessages";
import useMedia from "../hooks/useMedia";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user: string;
}

const Chat = ({ user, setUser }: Props) => {
  const { room } = useParams();
  console.log(room);
  const isMobile = useMedia("(max-width: 768px");

  const navigate = useNavigate();

  return (
    <div className="h-full overflow-hidden w-full flex justify-center items-center flex-col bg-slate-100">
      <div className="flex justify-between items-center justify-self-start w-full md:w-3/5 text-left">
        <div className="outline p-3 outline-4 w-fit flex bg-white justify-center items-center ">
          <h1 className="font-semibold text-2xl md:text-5xl">Room:</h1>
          <p className="font-extrabold text-2xl md:text-5xl  mr-4">{room}</p>
          <ClipboardCopyButton />
        </div>
        <button
          className="text-2xl underline outline p-3 outline-4 w-fit flex bg-white"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <HiOutlineHome size={isMobile ? "40" : "60"} />
        </button>
      </div>

      <RoomMessages user={user} />

      <MessageInputBox user={user} />

      {!user && <MakeChangesModal setUser={setUser} roomCode={room} />}
    </div>
  );
};

export default Chat;
