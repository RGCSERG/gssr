import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../functions/functions";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { updateMessageList } from "../functions/functions";

interface Props {
  user: string;
  setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const CreateRoomMessage = ({ user, setMessageList }: Props) => {
  const { room } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
      if (room) {
        sendMessage(
          currentMessage,
          room,
          user,
          updateMessageList,
          setMessageList
        );
      }
      setCurrentMessage("");
    }
  };
  return (
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
        onClick={() => {
          sendMessage;
        }}
        disabled={!user === true}
      >
        Send
      </button>
    </div>
  );
};

export default CreateRoomMessage;
