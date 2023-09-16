import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import JoinRoom from "./pages/JoinRoom";

const GSSR_DOMAIN = process.env.GSSR_DOMAIN;
const GSSR_PORT = process.env.GSSR_PORT;

const socket = io(`ws://${GSSR_DOMAIN}:${GSSR_PORT}`, {
  transports: ["websocket"],
});

const App = () => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <JoinRoom socket={socket} setUser={setUser} setRoom={setRoom} />
          }
        />
        <Route
          path={`/${room}`}
          element={<Chat socket={socket} user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
