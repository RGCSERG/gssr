import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MakeChangesModal from "../components/MakeChangesModal";
import {
  formatTimeWithLeadingZeros,
  getRandomInt,
} from "../functions/functions";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { joinRoom, sendChatMessage, socket } from "../functions/roomService";
interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  user: string;
}

const Chat = ({ user, setUser }: Props) => {
  const { room } = useParams(); //rooms must be joined with this param for it to work
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const chatBoxRef = useRef<HTMLSpanElement>(null);

  const updateMessageList = (newMessage: ChatMessage) => {
    setMessageList((list) => {
      // Check if the message with the same ID exists in the list
      const isMessageAlreadyInList = list.some(
        (message) => message.id === newMessage.id
      );

      // If the message with the same ID doesn't exist, add it to the list
      if (!isMessageAlreadyInList) {
        return [...list, newMessage];
      }

      // If the message already exists, return the original list without any changes
      return list;
    });
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleJoinRoom = () => {
    if (room !== undefined) {
      joinRoom(room);
    }
  };

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    } else {
      handleJoinRoom();
    }
  }, [user, room]);

  useEffect(() => {
    if (socket) {
      socket.on("chatted_message", updateMessageList);

      // Clean up the event listener when the component unmounts
      return () => {
        socket?.off("chatted_message", updateMessageList);
      };
    }
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && room !== undefined) {
      const messageData: ChatMessage = {
        id: getRandomInt(1000000000000, 9999999999999),
        room: room,
        author: user,
        message: currentMessage,
        time: formatTimeWithLeadingZeros(),
      };

      sendChatMessage(messageData);
      setCurrentMessage("");
      updateMessageList(messageData);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
      sendMessage();
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col ">
      <div className="text-5xl justify-self-start w-1/2 outlin text-left font-semibold ">
        <h1 className="outline p-3 w-fit bg-white">Lobby {room}</h1>
      </div>
      <span
        className="w-1/2 bg-white h-1/2  overflow-y-scroll no-scrollbar outline  pt-4 flex flex-col px-4"
        ref={chatBoxRef}
      >
        {messageList.map((messageContent, index) => (
          <div
            key={messageContent.id}
            className={`${
              user === messageContent.author ? "self-start" : "self-end"
            }`}
          >
            <p className="mb-1  font-semibold">
              {user === messageContent.author ? "you" : messageContent.author}
            </p>
            <div
              className={`outline rounded-sm w-fit p-3 mb-4 text-lg
              flex items-center justify-between gap-8
              ${user === messageContent.author ? " bg-slate-200" : "self-end"}`}
              id={user === messageContent.author ? "you" : "other"}
              key={index}
            >
              <p>{messageContent.message}</p>
              <p className="opacity-50"> {messageContent.time} </p>
            </div>
          </div>
        ))}
      </span>
      <div className="flex w-1/2 items-center justify-between text-xl outline">
        <input
          className="w-full h-full p-3 bg-none outline-none"
          type="text"
          value={currentMessage}
          placeholder="Enter a message..."
          disabled={!user === true}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={handleKeyDown} // Use onKeyDown event handler
        />

        <button
          className="p-3 outline-none h-full bg-white font-semibold"
          onClick={sendMessage}
          disabled={!user === true}
        >
          Send
        </button>
      </div>

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
