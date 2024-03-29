import { useEffect, useRef } from "react";
import useChat from "../hooks/useChat";
import useMessageList from "../hooks/useMessageList";
import useSocket from "../hooks/useSocket";

interface Props {
  user: string;
}

const RoomMessages = ({ user }: Props) => {
  const { socket } = useSocket();
  const { addMessageToList } = useChat();
  const { messageList } = useMessageList();

  const chatBoxRef = useRef<HTMLSpanElement>(null);

  // const removeMessagesWithIdZero = () => {
  //   const filteredMessages = messageList.filter(
  //     (message) => message.id !== 0.1
  //   );
  //   setMessageList(filteredMessages);
  // };
  useEffect(() => {
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    if (socket) {
      socket.on("chatted_message", (message) => {
        // removeMessagesWithIdZero();
        addMessageToList(message);
      });
    }
  }, [messageList]);
  return (
    <span
      className="w-full overflow-x-hidden md:w-3/5 bg-white h-3/5 md:h-1/2  outline-4 overflow-y-scroll no-scrollbar outline  pt-4 flex flex-col px-4"
      ref={chatBoxRef}
    >
      {messageList?.map((messageContent, index) => (
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
            className={`outline rounded-sm  p-3 mb-4 text-lg
              flex items-center justify-between gap-8
              ${user === messageContent.author ? " bg-slate-200" : "self-end"}`}
            id={user === messageContent.author ? "you" : "other"}
            key={index}
          >
            <p className="break-all break-words">{messageContent.message}</p>
            <p className="opacity-50"> {messageContent.time} </p>
          </div>
        </div>
      ))}
    </span>
  );
};

export default RoomMessages;
