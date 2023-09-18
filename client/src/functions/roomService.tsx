import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const DOMAIN_NAME = import.meta.env.VITE_GSSR_DOMAIN_NAME;
const PORT = import.meta.env.VITE_GSSR_PORT;

export const connectToSocketServer = () => {
  socket = io(`ws://${DOMAIN_NAME}:${PORT}`, {
    transports: ["websocket"],
  });

  return socket;
};

export const createRoom = () => {
  return new Promise((resolve) => {
    if (socket) {
      socket.emit("create_room");
      socket.on("room_created", (roomCode) => {
        // Do something with the room code, e.g., display it to the user
        console.log(`Room created with code: ${roomCode}`);
        resolve(roomCode); // Resolve the promise with the room code
      });
    }
    return Promise.resolve(undefined); // Return a resolved promise with undefined if socket is null
  });
};

export const joinRoom = (roomName: string) => {
  return new Promise((resolve, reject) => {
    if (socket) {
      let roomOccupantsReceived = false;

      // Emit the "join_room" event
      socket.emit("join_room", roomName);

      // Listen for "room_occupants" event
      socket.once("room_occupants", (roomOccupants) => {
        roomOccupantsReceived = true;
        if (roomOccupants) {
          resolve(roomOccupants); // Room exists, resolve the promise with room occupants
        } else {
          reject(`Room ${roomName} does not exist`); // Room does not exist, reject the promise with an error
        }
      });

      // Listen for "room_does_not_exist" event
      socket.once("room_does_not_exist", () => {
        if (!roomOccupantsReceived) {
          reject(`Room ${roomName} does not exist`); // Room does not exist, reject the promise with an error
        }
      });
    } else {
      reject("Socket is not available"); // Socket is not available, reject the promise with an error
    }
  });
};

export const leaveRoom = (roomName: string) => {
  if (socket) {
    socket.emit("leave_room", roomName);
  }
};

export const sendChatMessage = (roomName: string, message: string) => {
  if (socket) {
    socket.emit("chat_message", roomName, message);
  }
};
