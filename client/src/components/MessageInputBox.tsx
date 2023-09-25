import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useChat from "../hooks/useChat";
import {
  CurrentInputMessage,
  MessageInputBoxFormData,
} from "../interfaces/ChatMessage/CurrentInputMessage";

interface Props {
  user: string;
}

const MessageInputBox = ({ user }: Props) => {
  const { room } = useParams();
  const { sendMessage } = useChat();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInputBoxFormData>({
    resolver: zodResolver(CurrentInputMessage),
  });

  const handleMessageSend = (data: MessageInputBoxFormData) => {
    if (room && data.message.trim() !== "") {
      sendMessage(data.message, room, user);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleMessageSend)}
      className="flex w-full md:w-3/5 items-center justify-between text-xl outline outline-4"
    >
      <input
        {...register("message")}
        className="w-full h-full p-3 bg-none outline-none bg-slate-50"
        type="text"
        placeholder="Enter a message..."
        disabled={!user === true}
      />
      {errors.message && (
        <p className="outline-none bg-white">Please enter a shorter message</p>
      )}

      <button
        className="p-3 outline-none bg-slate-50 h-full  font-semibold"
        type="submit"
        disabled={!user === true}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInputBox;
