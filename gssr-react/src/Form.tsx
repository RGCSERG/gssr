import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

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
      <input
        {...register("roomCode")}
        placeholder="Enter Room Code"
        className="form-input"
      />
      <button className="form-button">Join Room</button>
    </form>
  );
};

export default Form;
