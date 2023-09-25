import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { insertMessage } from "./database.js"; // Import your message database functions

const app = express();

const roomOccupants = {};
const roomHistory = {}; // Store message history for each room

app.use(cors());

const server = http.createServer(app);

function getLatestMessages(roomName) {
  const messages = roomHistory[roomName] || [];
  const startIndex = Math.max(messages.length - 20, 0); // Start index for the last 20 messages
  return messages.slice(startIndex);
}

// Function to delete a room and its messages
function deleteRoom(roomName) {
  if (roomHistory[roomName]) {
    // Delete the room's message history
    delete roomHistory[roomName];
    console.log(`Message history for room ${roomName} has been deleted.`);
  }
}

const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from all origins
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
      socket.to(roomName).emit("room_occupants", roomOccupants[roomName]);

      // Check if the room is empty after removing the socket
      if (roomOccupants[roomName].length === 0) {
        // Room is empty, delete it
        delete roomOccupants[roomName];
        console.log(`Room ${roomName} is now empty and has been deleted.`);

        // Delete room messages
        deleteRoom(roomName);
      }
    }

    console.log(`Socket ${socketId} left room ${roomName}`);
  }

  console.log(`User Connected: ${socket.id}`);
  socket.on("create_room", () => {
    let roomCode;
    roomCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    socket.join(`${roomCode}`);

    if (!roomOccupants[`${roomCode}`]) {
      roomOccupants[`${roomCode}`] = [];
    }
    roomOccupants[`${roomCode}`].push(socket.id);

    // Initialize the message history for this room
    if (!roomHistory[`${roomCode}`]) {
      roomHistory[`${roomCode}`] = [];
    }

    // Emit the updated room occupants list to all clients in the room
    io.to(`${roomCode}`).emit("room_occupants", roomOccupants[`${roomCode}`]);

    socket.emit("room_created", roomCode);

    console.log(`Socket ${socket.id} created and joined room ${`${roomCode}`}`);
  });

  socket.on("join_room", async (roomName) => {
    if (roomOccupants[roomName]?.includes(socket.id)) {
      console.log(`Socket ${socket.id} is already in room ${roomName}`);
      return;
    }

    if (roomOccupants[roomName]) {
      socket.join(roomName);
      roomOccupants[roomName].push(socket.id);

      // Get the latest 20 messages for this room
      const latestMessages = getLatestMessages(roomName);

      // Emit the message history to the newly joined user
      socket.emit("message_history", latestMessages);

      // Emit the updated room occupants list to all clients in the room
      io.to(roomName).emit("room_occupants", roomOccupants[roomName]);

      console.log(`Socket ${socket.id} joined room ${roomName}`);
    } else {
      socket.emit("room_does_not_exist", "room_does_not_exist");
      console.log(`Socket ${socket.id} did not join room ${roomName}`);
    }
  });

  socket.on("chat_message", async (message) => {
    // Store the message in the database
    // const newMessage = await insertMessage(message.room, message.author, message.message);

    // Add the message to the message history for this room
    if (!roomHistory[message.room]) {
      roomHistory[message.room] = [];
    }
    roomHistory[message.room].push(message);

    // Keep the message history limited to the last 20 messages
    if (roomHistory[message.room].length > 20) {
      roomHistory[message.room].shift(); // Remove the oldest message
    }

    // Send the message to all clients in the specified room
    io.to(message.room).emit("chatted_message", message);

    console.log(
      `Socket ${socket.id} sent message in room ${message.room}: ${message}`
    );
  });

  socket.on("leave_room", (roomName) => {
    leaveRoomAndCheckIfEmpty(roomName, socket.id, socket, roomOccupants);

    // Check if the room is empty and delete it
    if (!roomOccupants[roomName] || roomOccupants[roomName].length === 0) {
      deleteRoom(roomName);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    for (const roomName in roomOccupants) {
      leaveRoomAndCheckIfEmpty(roomName, socket.id, socket, roomOccupants);

      // Check if the room is empty and delete it
      if (!roomOccupants[roomName] || roomOccupants[roomName].length === 0) {
        deleteRoom(roomName);
      }
    }
  });
});

const PORT = process.env.PORT || 5174;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING on port ${PORT}`);
});
