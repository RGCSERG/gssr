import { useEffect } from "react";
import { useMessageListContext } from "../contexts/MessageListContext";

function useMessageList() {
  // Check for socket before making accessible
  const messageListContext = useMessageListContext();

  const messageList = messageListContext && messageListContext.messageList;
  const setMessageList =
    messageListContext && messageListContext.setMessageList;

  useEffect(() => {
    if (messageList) {
      console.log("Message list exists!");
    } else {
      console.log("Message list does not exist!");
    }
  }, [messageList]);

  // Return the messageList and setMessageList conditionally
  return { messageList, setMessageList };
}

export default useMessageList;
