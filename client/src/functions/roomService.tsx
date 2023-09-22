import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";

export let socket: Socket | null = null;

const DOMAIN_NAME = import.meta.env.VITE_GSSR_DOMAIN_NAME;
const PORT = import.meta.env.VITE_GSSR_PORT;

export const connectToSocketServer = () => {
  socket = io(`${DOMAIN_NAME}:${PORT}`, {
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
  return new Promise<ChatMessage[]>(async (resolve, reject) => {
    if (socket) {
      // Emit the "join_room" event
      socket.emit("join_room", roomName);

      // Listen for "room_occupants" event
      socket.once("room_occupants", (roomOccupants) => {
        if (roomOccupants) {
        } else {
          reject(`Room ${roomName} does not exist`);
        }
      });

      // Listen for "room_does_not_exist" event
      socket.once("room_does_not_exist", () => {
        reject(`Room ${roomName} does not exist`);
      });

      // Listen for "message_history" event
      socket.once("message_history", (history) => {
        if (history) {
          // Resolve the promise with room occupants and message history
          resolve(history);
        } else {
          // If there's no message history, resolve with just room occupants
          resolve([]);
        }
      });
    } else {
      reject("Room is not available");
    }
  });
};

export const leaveRoom = (roomName: string) => {
  if (socket) {
    socket.emit("leave_room", roomName);
  }
};

export const sendChatMessage = (message: ChatMessage) => {
  if (socket) {
    socket.emit("chat_message", message);
  }
};
