import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { faviChange } from "./functions/functions";
import Chat from "./pages/Chat";
import HomePage from "./pages/HomePage";
import { connectToSocketServer } from "./functions/roomService";

connectToSocketServer();

const App = () => {
  useEffect(() => {
    faviChange();
    document.title = "gssr";
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
