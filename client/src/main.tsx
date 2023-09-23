import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import MessageContext from "./contexts/MessageListContext";
import { SocketProvider } from "./contexts/SocketContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <MessageContext>
        <SocketProvider>
          <App />
        </SocketProvider>
      </MessageContext>
    </HashRouter>
  </React.StrictMode>
);
