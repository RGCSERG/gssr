import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { JoinRoomFormData, JoinRoomSchema } from "../interfaces/Rooms/JoinRoom";

interface Props {
  joinRoom: (roomCode: string, username: string) => void;
}

const JoinRoomForm = ({ joinRoom }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JoinRoomFormData>({
    resolver: zodResolver(JoinRoomSchema),
  });

  const onSubmit = (data: JoinRoomFormData) => {
    const roomNum = data.room;
    if (typeof roomNum === "number") {
      ("joining an existing room");
      joinRoom(roomNum, data.username);
    } else {
      console.log("Room does not exist!");
    }
  };

  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
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

        <input
          {...register("room")}
          id="room"
          type="string"
          className="form-input"
          placeholder="Enter room name"
        />
        {errors.room && <p className="text-danger">{errors.room.message}</p>}
        {/* {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )} */}

        <button
          disabled={!isValid}
          className="form-button custom-input disabled:opacity-30 disabled:hover:bg-inherit"
        >
          Join Room
        </button>
      </form>
    </>
  );
};

export default JoinRoomForm;
