import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";
import MakeChangesModal from "../components/MakeChangesModal";
import { getRandomInt } from "../functions/functions";
import { ChatMessage } from "../interfaces/ChatMessage/ChatMessage";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
  user: string;
}

const Chat = ({ socket, user, setUser }: Props) => {
  const { room } = useParams(); //rooms must be joined with this param for it to work
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<ChatMessage[]>([]);
  const [showModal, setShowModal] = useState(false);

  const updateMessageList = (newMessage: ChatMessage) => {
    setMessageList((list) => {
      // Check if the message with the same ID exists in the list
      const isMessageAlreadyInList = list.some(
        (message) => message.id === newMessage.id
      );

      // If the message with the same ID doesn't exist, add it to the list
      if (!isMessageAlreadyInList) {
        return [...list, newMessage];
      }

      // If the message already exists, return the original list without any changes
      return list;
    });
  };

  const hideModal = () => {
    setShowModal(false);
    socket.emit("join_room", room);
  };

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    } else {
      socket.emit("join_room", room);
    }
  }, [user]);

  useEffect(() => {
    socket.on("receive_message", (data: ChatMessage) => {
      updateMessageList(data);
    });
    console.log("listening for messages");
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && room !== undefined) {
      const messageData: ChatMessage = {
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
      setCurrentMessage("");
      updateMessageList(messageData);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
      sendMessage();
    }
  };

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
                disabled={!user === true}
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyDown={handleKeyDown} // Use onKeyDown event handler
              />
            </Col>
            <Col xs="auto">
              <Button
                onClick={sendMessage}
                variant="primary"
                disabled={!user === true}
              >
                &#9658;
              </Button>
            </Col>
          </Row>
        </Container>
        {showModal && (
          <MakeChangesModal
            handleClose={hideModal}
            title="You are not logged in"
            body="sign up statement"
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
