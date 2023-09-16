import { Socket } from "socket.io-client";
import { useForm } from "react-hook-form"; // @7.43
import { z } from "zod"; // @3.20.6
import { zodResolver } from "@hookform/resolvers/zod"; // @2.9.11
import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";

const schema = z.object({
  room: z.string().min(2).max(50),
  username: z.string().min(5).max(50),
});

type SignUpFormData = z.infer<typeof schema>;

interface Props {
  socket: Socket;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const JoinRoom = ({ socket, setRoom, setUser }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const joinRoom = (data: SignUpFormData) => {
    setRoom(data.room);
    setUser(data.username);
    console.log("we up");

    socket.emit("join_room", data.room);
    navigate(`/room/${data.room}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          joinRoom(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="room" className="form-label">
            Room
          </label>
          <input
            {...register("room")}
            id="room"
            type="text"
            className="form-control"
            placeholder="XX-XX-XX"
          />
          {errors.room && <p className="text-danger">{errors.room.message}</p>}
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
            placeholder="GYYYAAAATTT"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
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

export default JoinRoom;
