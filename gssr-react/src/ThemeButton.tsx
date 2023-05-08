import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeButton = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleThemeIcon = () => {
    if (theme === "light") {
      return (
        <FiMoon
          onClick={handleThemeSwitch}
          color="black"
          size="50"
          className="theme-button"
        ></FiMoon>
      );
    } else {
      return (
        <FiSun
          onClick={handleThemeSwitch}
          color="white"
          size="50"
          className="theme-button"
        ></FiSun>
      );
    }
  };

  return <div>{handleThemeIcon()}</div>;
};

export default ThemeButton;
