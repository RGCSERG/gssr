const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5713/",
    methods: ["GET", "POST"],
  },
});



const usedNumbers = new Set(); //using set to ensure no duplicate values

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("create_room", () => {
    let roomCode; //defines empty room code variable
    do {
      roomCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; //generates random code from 1000 to 9999
    } while (usedNumbers.has(roomCode));
    usedNumbers.add(roomCode);
    console.log(`Created Room code ${roomCode}`)
    socket.emit("created_room",roomCode)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5174, () => {
  console.log("SERVER RUNNING");
});
