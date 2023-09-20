import express from "express"; // Import Express
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { insertMessage } from "./database";

const app = express();

const roomOccupants = {}; // Store room occupants

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5713/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  function leaveRoomAndCheckIfEmpty(roomName, socketId, socket, roomOccupants) {
    // Leave the specified room
    socket.leave(roomName);

    // Remove the socket from the room occupants list
    if (roomOccupants[roomName]) {
      roomOccupants[roomName] = roomOccupants[roomName].filter(
        (id) => id !== socketId
      );

      // Emit the updated room occupants list to all clients in the room
      socket.to(roomName).emit("room occupants", roomOccupants[roomName]);

      // Check if the room is empty after removing the socket
      if (roomOccupants[roomName].length === 0) {
        // Room is empty, delete it
        delete roomOccupants[roomName];
        console.log(`Room ${roomName} is now empty and has been deleted.`);
      }
    }

    console.log(`Socket ${socketId} left room ${roomName}`);
  }

  console.log(`User Connected: ${socket.id}`);
  socket.on("create_room", () => {
    let roomCode; //defines empty room code variable
    roomCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; //generates random code from 1000 to 9999
    // Create the specified room
    socket.join(`${roomCode}`);

    // Update room occupants data
    if (!roomOccupants[`${roomCode}`]) {
      roomOccupants[`${roomCode}`] = [];
    }
    roomOccupants[`${roomCode}`].push(socket.id);

    // Emit the updated room occupants list to all clients in the room
    io.to(`${roomCode}`).emit("room occupants", roomOccupants[`${roomCode}`]);

    socket.emit("room_created", roomCode);

    console.log(`Socket ${socket.id} created and joined room ${`${roomCode}`}`);
  });

  socket.on("join_room", (roomName) => {
    // Check if the user is already in the room
    if (roomOccupants[roomName]?.includes(socket.id)) {
      // User is already in the room, no need to join again
      console.log(`Socket ${socket.id} is already in room ${roomName}`);
      return;
    }

    // Check if the room exists
    if (roomOccupants[roomName]) {
      // Join the specified room
      socket.join(roomName);

      // Update room occupants data
      roomOccupants[roomName].push(socket.id);

      // Emit the updated room occupants list to all clients in the room
      io.to(roomName).emit("room_occupants", roomOccupants[roomName]);

      console.log(`Socket ${socket.id} joined room ${roomName}`);
    } else {
      // Notify the client that the room does not exist
      socket.emit("room_does_not_exist", "room_does_not_exist");
      console.log(`Socket ${socket.id} did not join room ${roomName}`);
    }
  });

  socket.on("chat_message", (message) => {
    console.log(message);
    // Send the message to all clients in the specified room
    // insertMessage(message.room, message.author, message.message);
    io.to(message.room).emit("chatted_message", message);

    console.log(
      `Socket ${socket.id} sent message in room ${message.room}: ${message.message}`
    );
  });

  socket.on("leave_room", (roomName) => {
    leaveRoomAndCheckIfEmpty(roomName, socket.id, socket, roomOccupants);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    for (const roomName in roomOccupants) {
      leaveRoomAndCheckIfEmpty(roomName, socket.id, socket, roomOccupants);
    }
  });
});

server.listen(5174, () => {
  console.log("SERVER RUNNING");
});
