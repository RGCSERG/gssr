import React from "react";
import Form from "./Form";
import Button from "./Button";
import ThemeButton from "./ThemeButton";
import GitHubMark from "./assets/GitHubMark.svg";

const MainPage = () => {
  return (
    <>
      <div className="dark:bg-black flex items-center justify-center h-screen flex-col gap-8 font-mono">
        <p className="dark:text-white font-bold text-5xl motion-safe:animate-bounce">
          Welcome to gssr.
        </p>
        <Form placehold="Enter a Username" name="username" />
        <Form placehold="Enter a Room name" name="roomName" />
        <div className="flex items-center justify-center gap-5 w-full">
          <Button name="Join room" />
          <Button name="Create room" />
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-20 fixed bottom-0 left-0 gap-3 font-mono">
        <a
          className="hover:rotate-180 inline-flex items-center duration-200"
          href="https://github.com/RGCSERG/gssr"
        >
          <img
            className="mx-auto object-center object-scale-down h-9 dark:invert"
            src={GitHubMark}
          ></img>
        </a>
        <p className="text-xl dark:text-white">
          © 2023{" "}
          <a
            className="text-blue-500 hover:text-blue-600 underline dark:text-blue-400 dark:hover:text-blue-500"
            href="https://github.com/RGCSERG"
          >
            RGCSERG
          </a>{" "}
          &{" "}
          <a
            className="text-blue-500 hover:text-blue-600 underline dark:text-blue-400 dark:hover:text-blue-500"
            href="https://github.com/goat6"
          >
            goat6
          </a>
        </p>
      </div>
      <ThemeButton />
    </>
  );
};

export default MainPage;
