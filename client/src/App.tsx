import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";

const DOMAIN_NAME = import.meta.env.VITE_GSSR_DOMAIN_NAME;
const PORT = import.meta.env.VITE_GSSR_PORT;

const socket = io(`ws://${DOMAIN_NAME}:${PORT}`, {
  transports: ["websocket"],
});

const App = () => {
  const [user, setUser] = useState<string>("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage socket={socket} setUser={setUser} />}
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
