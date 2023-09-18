import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ExampleComponent from "./pages/DevPage";
import { faviChange } from "./functions/functions";
import { connectToSocketServer } from "./roomService";

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
        <Route path="/" element={<ExampleComponent />} />
      </Routes>
    </div>
  );
};

export default App;
