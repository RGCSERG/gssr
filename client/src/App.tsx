import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { faviChange } from "./functions/functions";
import { connectToSocketServer } from "./hooks/UseRoom";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";

connectToSocketServer();

const App = () => {
  useEffect(() => {
    faviChange();
    document.title = "the middest chatroom";
  }, []);

  const [user, setUser] = useState<string>("");

  return (
    <div className="font-mono h-screen w-screen">
      <Routes>
        <Route path="/" element={<HomePage setUser={setUser} />} />
        <Route
          path="/room/:room" //dynamically renders room from room
          element={<Chat user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
