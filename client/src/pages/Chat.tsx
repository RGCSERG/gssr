import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClipboardCopyButton from "../components/ClipboardCopyButton";
import MakeChangesModal from "../components/MakeChangesModal";
import MessageInputBox from "../components/MessageInputBox";
import RoomMessages from "../components/RoomMessages";
import { initialiseRoom } from "../hooks/UseRoom";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user: string;
}

const Chat = ({ user, setUser }: Props) => {
  const { room } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const navigate = useNavigate();

  const hideModal = () => setShowModal(false);

  initialiseRoom(setShowModal, setMessageList, user, room);

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

      <RoomMessages
        user={user}
        messageList={messageList}
        setMessageList={setMessageList}
      />

      <MessageInputBox user={user} setMessageList={setMessageList} />

      {showModal && (
        <MakeChangesModal handleClose={hideModal} setUser={setUser} />
      )}
    </div>
  );
};

export default Chat;
