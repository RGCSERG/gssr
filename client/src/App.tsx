import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import JoinRoom from "./pages/JoinRoom";

const GSSR_DOMAIN = import.meta.env.VITE_GSSR_DOMAIN;
const GSSR_PORT = import.meta.env.VITE_GSSR_PORT;

const socket = io(`ws://${GSSR_DOMAIN}:${GSSR_PORT}`, {
  transports: ["websocket"],
});

const App = () => {
  const [user, setUser] = useState<string>("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<JoinRoom socket={socket} setUser={setUser} />}
        />
        <Route
          path="/room/:room" //dynamically renders room from room
          element={<Chat socket={socket} user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
