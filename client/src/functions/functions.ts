import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { sendChatMessage } from "./roomService";

export function getRandomInt(min: number, max: number): number {
  // rounds to nearest int

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const faviChange = () => {
  const link =
    (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
    document.createElement("link");
  link.type = "image/svg+xml";
  link.rel = "icon";
  link.href = "test.svg";
  document.head.appendChild(link);
};

export function formatTimeWithLeadingZeros() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Add leading zeros if needed
  const formattedHours = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

  // Combine hours and minutes
  const formattedTime = formattedHours + ":" + formattedMinutes;

  return formattedTime;
}

export const sendMessage = async (
  currentMessage: string,
  room: string,
  user: string,
  updateMessageList: (
    newMessage: ChatMessage,
    setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  ) => void,
  setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) => {
  if (currentMessage.trim() !== "" && room !== undefined) {
    const messageData: ChatMessage = {
      id: getRandomInt(1000000000000, 9999999999999),
      room: room,
      author: user,
      message: currentMessage,
      time: formatTimeWithLeadingZeros(),
    };
    updateMessageList(messageData, setMessageList);
    sendChatMessage(messageData);
  }
};

export const updateMessageList = (
  newMessage: ChatMessage,
  setMessageList: React.Dispatch<React.SetStateAction<ChatMessage[]>>
) => {
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
