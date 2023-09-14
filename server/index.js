const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { log } = require("console");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5714",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconect", (socket) => {
    console.log("user disconected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
