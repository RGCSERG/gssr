import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import { ContextProps } from "../interfaces/Context/Context";

interface MessageListContextType {
  messageList: ChatMessage[];
  setMessageList: React.Dispatch<SetStateAction<ChatMessage[]>>;
}

const defaultContextValue: MessageListContextType = {
  messageList: [], // Default value for messageList
  setMessageList: () => {}, // Default value for setMessageList (empty function)
};

const MessageListContext =
  createContext<MessageListContextType>(defaultContextValue);

export const useMessageListContext = () => {
  return useContext(MessageListContext);
};

export const MessageListProvider = ({ children }: ContextProps) => {
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);

  return (
    <MessageListContext.Provider value={{ messageList, setMessageList }}>
      {children}
    </MessageListContext.Provider>
  );
};

export default MessageListProvider;
