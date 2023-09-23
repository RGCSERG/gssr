import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MessageContext from "./contexts/MessageListContext";
import { SocketProvider } from "./contexts/SocketContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageContext>
        <SocketProvider>
          <App />
        </SocketProvider>
      </MessageContext>
    </BrowserRouter>
  </React.StrictMode>
);
