import {
  formatTimeWithLeadingZeros,
  getRandomInt,
} from "../functions/functions";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import useMessageList from "./useMessageList";

import useSocket from "./useSocket";

const useChat = () => {
  const { socket } = useSocket();
  const { setMessageList } = useMessageList();

  const sendChatMessage = (message: ChatMessage) => {
    if (socket) {
      socket.emit("chat_message", message);
    }
  };

  const sendMessage = async (
    currentMessage: string,
    room: string,
    user: string
  ) => {
    if (currentMessage.trim() !== "" && room !== undefined) {
      const messageData: ChatMessage = {
        id: getRandomInt(1000000000000, 9999999999999),
        room: room,
        author: user,
        message: currentMessage,
        time: formatTimeWithLeadingZeros(),
      };
      updateMessageList(messageData);
      sendChatMessage(messageData);
    }
  };

  const updateMessageList = (newMessage: ChatMessage) => {
    console.log("updating message list!");
    setMessageList((list) => {
      // Check if the message with the same ID exists in the list
      const isMessageAlreadyInList = list!.some(
        (message) => message.id === newMessage.id
      );

      // If the message with the same ID doesn't exist, add it to the list
      if (!isMessageAlreadyInList) {
        return [...list!, newMessage];
      }

      // If the message already exists, return the original list without any changes
      return list;
    });
  };

  return { sendMessage, updateMessageList };
};

export default useChat;
