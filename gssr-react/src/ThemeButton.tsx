import React, { useEffect, useState } from "react";
import logo from "./assets/ThemeIcon.svg";

const ThemeButton = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log(theme);
  };

  return (
    <img
      onClick={handleThemeSwitch}
      className="w-1/12 scale-50 fixed top-0 right-0 focus:outline-none dark:text-white dark:rotate-180 hover:scale-60 transition-all duration-300 dark:invert"
      src={logo}
    ></img>
  );
};

export default ThemeButton;
