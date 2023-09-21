import { BsGithub } from "react-icons/bs";

const Credits = () => {
  return (
    <div
      className="text-shadow fixed bottom-0 left-0 flex h-20 w-full select-none items-center 
    justify-center gap-3 font-mono"
    >
      <a
        className="inline-flex items-center duration-200 hover:scale-110 hover:animate-pulse"
        href="https://github.com/RGCSERG/gssr"
      >
        <BsGithub className=" object-center dark:invert" size={35}></BsGithub>
      </a>
      <p className=" dark:text-white sm:text-xl">
        © 2023{" "}
        <a
          className="credit-text"
          href="https://github.com/RGCSERG"
          target="_blank"
        >
          RGCSERG
        </a>{" "}
        &{" "}
        <a
          className="credit-text"
          href="https://github.com/yonahadev"
          target="_blank"
        >
          yonahadev
        </a>
      </p>
    </div>
  );
};

export default Credits;
