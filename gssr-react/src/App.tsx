import Form from "./Form";
import ThemeButton from "./ThemeButton";
import Credits from "./Credits";
import { useEffect } from "react";
import faviChange from "./faviChange";

const App = () => {
  useEffect(() => {
    faviChange();
    document.title = "gssr";
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center font-mono dark:bg-black">
        <p className="text-shadow mb-4 text-2xl font-bold motion-safe:animate-bounce dark:text-white md:text-5xl">
          Welcome to gssr.
        </p>
        <Form />
      </div>
      <Credits />
      <ThemeButton />
    </>
  );
};

export default App;
