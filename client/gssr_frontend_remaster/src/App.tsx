import { io } from "socket.io-client";
import { GSSR_DOMAIN, GSSR_PORT } from "./constants";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Chat from "./pages/Chat";
import { useState } from "react";
// import { Alert } from "react-bootstrap";

const socket = io(`ws://${GSSR_DOMAIN}:${GSSR_PORT}`, {
  transports: ["websocket"],
});

const App = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

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
          path="/room/:room"
          element={<Chat socket={socket} user={user} />}
        />
      </Routes>
    </>
  );
};

export default App;
