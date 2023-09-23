import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import MessageContext from "./contexts/MessageListContext.tsx";
import { SocketProvider } from "./contexts/SocketContext.tsx";
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
