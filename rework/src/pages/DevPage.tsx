import React, { useState, useEffect } from "react";
import { socket } from "../roomService";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  sendChatMessage,
} from "../roomService";
import { ChatMessage } from "../interfacce";
import {
  formatTimeWithLeadingZeros,
  getRandomInt,
} from "../functions/functions";

const ExampleComponent: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Array to store chat messages
  const [messageIds, setMessageIds] = useState<Set<number>>(new Set()); // Set to track message IDs

  const handleCreateRoom = async () => {
    const room = await createRoom();
    setRoomName(room ? "" : "");
  };

  const handleJoinRoom = async () => {
    const room = await joinRoom(roomName);
    console.log(room);
  };

  const handleLeaveRoom = () => {
    leaveRoom(roomName);
    console.log("left room");
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && roomName !== undefined) {
      const newMessage: ChatMessage = {
        id: getRandomInt(1000000000000, 9999999999999),
        room: roomName,
        message: message,
        time: formatTimeWithLeadingZeros(),
      };
      // Send the message
      sendChatMessage(newMessage);

      // Clear the message input field
      setMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      const handleChatMessage = (receivedMessage: ChatMessage) => {
        console.log(receivedMessage);
        // Add the received message to the chatMessages array if it's not already present
        if (!messageIds.has(receivedMessage.id)) {
          setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
          // Add the message ID to the set to mark it as received
          setMessageIds((prevIds) => new Set(prevIds).add(receivedMessage.id));
        }
      };

      // Subscribe to the "chatted_message" event
      socket.on("chatted_message", handleChatMessage);

      // Clean up the event listener when the component unmounts
      return () => {
        socket?.off("chatted_message", handleChatMessage);
      };
    }
  }, [chatMessages]);

  return (
    <div>
      <input
        type="text"
        placeholder="Room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={handleLeaveRoom}>Leave Room</button>
      <div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        <h2>Chat Messages</h2>
        <ul>
          {chatMessages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.room}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExampleComponent;
