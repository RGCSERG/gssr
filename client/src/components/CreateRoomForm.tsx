import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  CreateRoomFormData,
  CreateRoomSchema,
} from "../interfaces/Rooms/CreateRoom";

interface Props {
  createRoom: (formData: CreateRoomFormData) => void;
}
const CreateRoomForm = ({ createRoom }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(CreateRoomSchema),
  });

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

        <button
          disabled={!isValid}
          className="form-button custom-input disabled:opacity-30 disabled:hover:bg-inherit"
        >
          Create Room
        </button>
        <div className="form-input opacity-0" />
      </form>
    </>
  );
};

export default CreateRoomForm;
