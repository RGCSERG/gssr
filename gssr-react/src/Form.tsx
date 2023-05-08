import InputField from "./InputField";
import Button from "./Button";

const Form = () => {
  return (
    <>
      <InputField placehold="Enter a Username" name="username" />
      <InputField placehold="Enter a Room name" name="roomName" />
      <div className="flex w-full items-center justify-center gap-6">
        <Button name="Join room" />
        <Button name="Create room" />
      </div>
    </>
  );
};

export default Form;
