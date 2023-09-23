import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useMessageList from "../hooks/useMessageList";
import useRoom from "../hooks/useRoom";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string>>;
  roomCode: string | undefined;
}
const schema = z.object({
  username: z.string().min(3).max(50),
});

type SignUpFormData = z.infer<typeof schema>;

const MakeChangesModal = ({ setUser, roomCode }: Props) => {
  const { joinRoom } = useRoom();
  const navigate = useNavigate();
  const { setMessageList } = useMessageList();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    setUser(data.username);
    if (roomCode) {
      const messageHistory = await joinRoom(roomCode);
      setMessageList(messageHistory);
    }
    reset();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center  absolute backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-2xl bg-white flex flex-col items-center justify-center gap-10"
      >
        <h1 className="text-4xl font-semibold">Please enter a username</h1>
        <div>
          <input
            {...register("username")}
            id="username"
            type="text"
            placeholder="Enter username..."
            className="outline-4 focus:outline-black outline p-4 mr-3"
          />
          {errors.username && <p>{errors.username.message}</p>}
          <button className="outline-4 outline p-4">Enter</button>
        </div>
        <button
          className="text-blue-500 underline"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MakeChangesModal;
