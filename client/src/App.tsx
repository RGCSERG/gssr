import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { faviChange } from "./functions/functions";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import OauthRedirectPage from "./pages/OauthRedirectPage";

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
          element={<ChatPage user={user} setUser={setUser} />}
        />
        <Route path="/oauth/callback" element={<OauthRedirectPage />} />
      </Routes>
    </div>
  );
};

export default App;
