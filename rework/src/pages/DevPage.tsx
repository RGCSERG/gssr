import React, { useState, useEffect } from "react";
import { socket } from "../roomService";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  sendChatMessage,
} from "../roomService";

const ExampleComponent: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]); // Array to store chat messages

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
    // Send the message
    sendChatMessage(roomName, message);

    // Add the sent message to the chatMessages array
    setChatMessages((prevMessages) => [...prevMessages, message]);

    // Clear the message input field
    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      const handleChatMessage = (receivedMessage: string) => {
        // Add the received message to the chatMessages array
        setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
      };

      // Subscribe to the "chatted_message" event
      socket.on("chatted_message", handleChatMessage);

      // Clean up the event listener when the component unmounts
      return () => {
        socket?.off("chatted_message", handleChatMessage);
      };
    }
  }, []);

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
          {chatMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExampleComponent;
