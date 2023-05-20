import { FieldValues, useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  roomCode: z.number().int().safe().finite().positive().min(100000).max(999999),
  username: z.string().min(3).max(20).trim(),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-4"
    >
      <input
        {...register("username")}
        placeholder="Enter Username"
        className="form-input"
      />
      {/* {errors.username && <p>{errors.username.message}</p>} */}
      <input
        {...register("roomCode", { valueAsNumber: true })}
        placeholder="Enter Room Code"
        className="form-input custom-input"
        type="number"
      />
      {/* {errors.roomCode && <p>{errors.roomCode.message}</p>} */}
      <button
        disabled={!isValid}
        className="form-button custom-input disabled:opacity-30 disabled:hover:bg-inherit"
      >
        Join Room
      </button>
    </form>
  );
};

export default Form;
