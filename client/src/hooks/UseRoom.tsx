import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";
import useSocket from "./useSocket";

const useRoom = () => {
  const { socket } = useSocket();

  const fetchNewRoomCode = () => {
    console.log("trying to fetch room code");
    return new Promise<string>((resolve, reject) => {
      if (socket) {
        socket.emit("create_room");
        socket.on("room_created", (roomCode) => {
          // Do something with the room code, e.g., display it to the user
          console.log(`Room created with code: ${roomCode}`);
          resolve(roomCode); // Resolve the Promise with the room code
        });
      } else {
        reject("Socket is not available");
      }
    });
  };

  const joinRoom = (roomCode: string) => {
    console.log("Firing join room event");
    return new Promise<ChatMessage[]>(async (resolve, reject) => {
      if (socket) {
        // Emit the "join_room" event
        socket.emit("join_room", roomCode);

        // Listen for "room_occupants" event
        socket.once("room_occupants", (roomOccupants) => {
          if (roomOccupants) {
          } else {
            reject(`Room ${roomCode} does not exist`);
          }
        });

        // Listen for "room_does_not_exist" event
        socket.once("room_does_not_exist", () => {
          reject(`Room ${roomCode} does not exist`);
        });

        // Listen for "message_history" event
        socket.once("message_history", (history) => {
          if (history) {
            // Resolve the promise with room occupants and message history
            console.log(history);
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

  const leaveRoom = (roomCode: string) => {
    if (socket) {
      socket.emit("leave_room", roomCode);
    }
  };

  return { joinRoom, leaveRoom, fetchNewRoomCode };
};

export default useRoom;
