import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../hooks/useChat.tsx";

interface Props {
  user: string;
}

const MessageInputBox = ({ user }: Props) => {
  const { room } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const { sendMessage } = useChat();

  const handleMessageSend = () => {
    if (room && currentMessage.trim() !== "") {
      sendMessage(currentMessage, room, user);
      setCurrentMessage("");
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
      handleMessageSend();
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
        onKeyDown={handleKeydown} // Use onKeyDown event handler
      />

      <button
        className="p-3 outline-none h-full bg-white font-semibold"
        onClick={handleMessageSend}
        disabled={!user === true}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInputBox;
