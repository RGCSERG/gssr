import express from "express";
import http from "http";
import cors from "cors";
import initialiseWebSocket from "./webSocketServer.js";
import api from "./api.js";

const app = express();
app.use(cors());
const server = http.createServer(app);

initialiseWebSocket(server);

app.use("/api", api);

const PORT = process.env.PORT || 5174;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING on port ${PORT}`);
});
