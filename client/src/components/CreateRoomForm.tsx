import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";

import {
  CreateRoomFormData,
  CreateRoomSchema,
} from "../interfaces/Rooms/CreateRoom";

interface Props {
  joinRoom: (roomCode: number, username: string) => void;
  socket: Socket;
}

const CreateRoomForm = ({ joinRoom, socket }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomSchema),
  });

  const createRoom = async (data: CreateRoomFormData) => {
    const roomCode = await generateRoomCode();
    typeof roomCode === "number" ? joinRoom(roomCode, data.username) : null;
  };

  const generateRoomCode = async () => {
    console.log("Send create room request");

    return new Promise((resolve) => {
      socket.on("created_room", (receivedRoomCode: number) => {
        resolve(receivedRoomCode);
      });
      socket.emit("create_room");
    });
  };

  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit(createRoom)}
      >
        <input
          {...register("username")}
          id="username"
          type="text"
          className="form-input"
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}

        {/* {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )} */}

        <button
          disabled={!isValid}
          className="form-button custom-input disabled:opacity-30 disabled:hover:bg-inherit"
        >
          JOIN ROOM
        </button>
        <div className="form-input opacity-0" />
      </form>
    </>
  );
};

export default CreateRoomForm;
