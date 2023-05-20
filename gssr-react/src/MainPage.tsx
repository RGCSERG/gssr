import Form from "./Form";
import ThemeButton from "./ThemeButton";
import Credits from "./Credits";

const MainPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-8 font-mono dark:bg-black">
        <p className="text-shadow text-5xl font-bold motion-safe:animate-bounce dark:text-white">
          Welcome to gssr.
        </p>
        <Form />
      </div>
      <Credits />
      <ThemeButton />
    </>
  );
};

export default MainPage;
