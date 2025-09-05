// src/components/Topbar.jsx
import { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

function Topbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://ui-avatars.com/api/?name=Surajit+Das&background=random"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-gray-800 dark:text-gray-200">
            Surajit Das
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;