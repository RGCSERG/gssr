import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";

function useSocket() {
  //checks for socket before making accessible
  const socketContext = useSocketContext();

  const socket = socketContext && socketContext.socket;

  useEffect(() => {
    if (socket) {
      console.log("Socket exists!");
    } else {
      console.log("Socket does not exist!");
    }
  }, [socket]);

  return { socket };
}

export default useSocket;
