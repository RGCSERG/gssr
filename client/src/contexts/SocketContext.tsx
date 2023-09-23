import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ContextProps } from "../interfaces/Context/Context";

const CONNECTION_STRING = import.meta.env.VITE_CONNECTION_STRING;

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: ContextProps) => {
  //initialises global socket context
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(CONNECTION_STRING, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
