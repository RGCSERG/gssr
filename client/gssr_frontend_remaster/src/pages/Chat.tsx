import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

interface Message {
  id: number;
  room: string;
  author: string;
  message: string;
  time: string;
}

interface Props {
  socket: Socket;
  user: string;
}

const Chat = ({ socket, user }: Props) => {
  const { room } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  function getRandomInt(min: number, max: number): number {
    // Use Math.floor() to round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && room !== undefined) {
      const messageData: Message = {
        id: getRandomInt(1000000000000, 9999999999999),
        room: room,
        author: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => {
        // Check if the message with the same ID exists in the list
        const isMessageAlreadyInList = list.some(
          (message) => message.id === messageData.id
        );

        // If the message with the same ID doesn't exist, add it to the list
        if (!isMessageAlreadyInList) {
          return [...list, messageData];
        }

        // If the message already exists, return the original list without any changes
        return list;
      });
      setCurrentMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: Message) => {
      setMessageList((list) => {
        // Check if the message with the same ID exists in the list
        const isMessageAlreadyInList = list.some(
          (message) => message.id === data.id
        );

        // If the message with the same ID doesn't exist, add it to the list
        if (!isMessageAlreadyInList) {
          return [...list, data];
        }

        // If the message already exists, return the original list without any changes
        return list;
      });
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header mb-3">
        <div className="center-alert">
          <Alert key="info" variant="info">
            WELCOME TO THE CHAT
          </Alert>
        </div>
      </div>
      <div className="chat-body">
        <Container>
          <Row>
            <Col>
              <ScrollToBottom className="message-container">
                {messageList.map((messageContent, index) => (
                  <div
                    className="message mb-3"
                    id={user === messageContent.author ? "you" : "other"}
                    key={index}
                  >
                    <Card>
                      <Card.Body>
                        <Card.Text>{messageContent.message}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          {messageContent.time} by {messageContent.author}
                        </small>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </ScrollToBottom>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="chat-footer">
        <Container>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyDown={handleKeyDown} // Use onKeyDown event handler
              />
            </Col>
            <Col xs="auto">
              <Button onClick={sendMessage} variant="primary">
                &#9658;
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Chat;
