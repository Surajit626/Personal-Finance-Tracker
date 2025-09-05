// src/context/ThemeContext.jsx
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};