import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MakeChangesModal from "../components/MakeChangesModal";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { joinRoom } from "../functions/roomService";
import RoomMessages from "../components/RoomMessages";
import CreateRoomMessage from "../components/CreateRoomMessage";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user: string;
}

const Chat = ({ user, setUser }: Props) => {
  const { room } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const setupChatRoom = async () => {
      try {
        if (!user) {
          setShowModal(true);
        } else if (room !== undefined) {
          // Join the room and retrieve message history
          const messageHistory = await joinRoom(room);
          setMessageList(messageHistory);
        }
      } catch (error) {
        console.error(error);
      }
    };

    setupChatRoom();
  }, [user, room]);

  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <div className="text-5xl justify-self-start w-1/2 outline text-left font-semibold">
        <h1 className="outline p-3 w-fit bg-white">Lobby {room}</h1>
      </div>

      <RoomMessages
        user={user}
        messageList={messageList}
        setMessageList={setMessageList}
      />

      <CreateRoomMessage user={user} setMessageList={setMessageList} />

      {showModal && (
        <MakeChangesModal
          handleClose={hideModal}
          title="You are not logged in"
          body="sign up statement"
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default Chat;
