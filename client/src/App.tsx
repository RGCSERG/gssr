import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./pages/Chat";
import JoinRoom from "./pages/JoinRoom";

const domainName = import.meta.env.VITE_GSSR_DOMAIN_NAME;
const port = import.meta.env.VITE_GSSR_PORT;

const socket = io(`ws://${domainName}:${port}`, {
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
