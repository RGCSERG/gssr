import { useEffect } from "react";
import { io } from "socket.io-client";
import { GSSR_DOMAIN, GSSR_PORT } from "./constants";

const socket = io(`ws://${GSSR_DOMAIN}:${GSSR_PORT}`, {
  transports: ["websocket"],
});

const App = () => {
  useEffect(() => {
    // You can now use the 'socket' instance to send and receive data.
    // For example:
    socket.emit("chat message", "Hello, server!"); // Emit a message to the server

    socket.on("chat message", (message) => {
      // Handle incoming messages from the server
      console.log("Received message from server:", message);
    });

    // Don't forget to clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>App</div>;
};

export default App;
