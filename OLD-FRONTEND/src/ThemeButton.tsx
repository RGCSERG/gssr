import { useEffect, useState } from "react";
import { RiMoonFoggyLine, RiSunCloudyLine } from "react-icons/ri";

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
        <RiMoonFoggyLine
          onClick={handleThemeSwitch}
          color="black"
          size="50"
          className="theme-button"
        ></RiMoonFoggyLine>
      );
    } else {
      return (
        <RiSunCloudyLine
          onClick={handleThemeSwitch}
          color="white"
          size="50"
          className="theme-button"
        ></RiSunCloudyLine>
      );
    }
  };

  return <div>{handleThemeIcon()}</div>;
};

export default ThemeButton;
