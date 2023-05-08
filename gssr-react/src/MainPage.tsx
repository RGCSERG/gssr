import Form from "./Form";
import Button from "./Button";
import ThemeButton from "./ThemeButton";
import { BsGithub } from "react-icons/bs";

const MainPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-8 font-mono dark:bg-black">
        <p className="text-shadow text-5xl font-bold motion-safe:animate-bounce dark:text-white">
          Welcome to gssr.
        </p>
        <Form placehold="Enter a Username" name="username" />
        <Form placehold="Enter a Room name" name="roomName" />
        <div className="flex w-full items-center justify-center gap-5">
          <Button name="Join room" />
          <Button name="Create room" />
        </div>
      </div>
      <div className="text-shadow fixed bottom-0 left-0 flex h-20 w-full select-none items-center justify-center gap-3 font-mono">
        <a
          className="inline-flex items-center duration-200 hover:scale-110 hover:animate-pulse"
          href="https://github.com/RGCSERG/gssr"
        >
          <BsGithub className=" object-center dark:invert" size={35}></BsGithub>
        </a>
        <p className="text-xl dark:text-white">
          © 2023{" "}
          <a className="credit-text" href="https://github.com/RGCSERG">
            RGCSERG
          </a>{" "}
          &{" "}
          <a className="credit-text" href="https://github.com/goat6">
            goat6
          </a>
        </p>
      </div>
      <ThemeButton />
    </>
  );
};

export default MainPage;
