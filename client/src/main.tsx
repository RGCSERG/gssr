import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MessageContext from "./contexts/MessageListContext";
import { SocketProvider } from "./contexts/SocketContext";
import "./index.css";
import { AuthProvider } from "./contexts/OauthProviderContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MessageContext>
          <SocketProvider>
            <App />
          </SocketProvider>
        </MessageContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
