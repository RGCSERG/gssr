import { useEffect, useRef } from "react";
import { socket } from "../functions/roomService";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { updateMessageList } from "../functions/functions";

interface Props {
  user: string;
  messageList: ChatMessage[];
  setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const RoomMessages = ({ user, messageList, setMessageList }: Props) => {
  const chatBoxRef = useRef<HTMLSpanElement>(null);
  const removeMessagesWithIdZero = () => {
    const filteredMessages = messageList.filter(
      (message) => message.id !== 0.1
    );
    setMessageList(filteredMessages);
  };
  useEffect(() => {
    if (socket) {
      socket.on("chatted_message", (message) => {
        removeMessagesWithIdZero();
        updateMessageList(message, setMessageList);
      });

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
  return (
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
  );
};

export default RoomMessages;
