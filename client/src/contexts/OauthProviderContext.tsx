import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ContextProps } from "../interfaces/Context/Context";

interface MessageListContextType {
  user: string;
  loginWithGitHub: () => void;
  loginAsGuest: (usernameString: string) => void;
  logout: () => void;
}

const defaultContextValue: MessageListContextType = {
  user: "",
  loginWithGitHub: () => {},
  loginAsGuest: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultContextValue);

const GITHUB_REDIRECT_URL = import.meta.env.VITE_GITHUB_REDIRECT_URL;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (token) {
      // If a token exists, fetch user data and set the user.
      axios
        .get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const loginAsGuest = (usernameString: string) => {
    setUser(usernameString);
  };

  const loginWithGitHub = () => {
    try {
      // Redirect the user to GitHub for authentication
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user`;
    } catch (error) {
      console.error("Error logging in with GitHub:", error);
    }
  };

  const logout = () => {
    // Clear user data and token from storage
    localStorage.removeItem("github_token");
    setUser("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGitHub,
        logout,
        loginAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
