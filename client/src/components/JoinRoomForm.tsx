import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { JoinRoomFormData, JoinRoomSchema } from "../interfaces/Rooms/JoinRoom";

interface Props {
  joinRoom: (roomCode: number, username: string) => void;
}

const JoinRoomForm = ({ joinRoom }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinRoomFormData>({
    resolver: zodResolver(JoinRoomSchema),
  });

  const onSubmit = (data: JoinRoomFormData) => {
    console.log(typeof data.room);
    const roomNum = parseInt(data.room);
    if (typeof roomNum === "number") {
      ("joining an existing room");
      joinRoom(roomNum, data.username);
    } else {
      console.log("Room does not exist!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div className="mb-3">
            <label htmlFor="room" className="form-label">
              Room
            </label>
            <input
              {...register("room")}
              id="room"
              type="string"
              className="form-control"
              placeholder="Enter room name"
            />
            {errors.room && (
              <p className="text-danger">{errors.room.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              {...register("username")}
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
        </>

        {/* {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )} */}
        <div className="d-grid">
          <button className="btn btn-primary">JOIN ROOM</button>
        </div>
      </form>
    </>
  );
};

export default JoinRoomForm;
