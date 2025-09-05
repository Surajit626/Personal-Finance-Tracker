// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { sampleTransactions } from "./data/sampleData";
import { ThemeContext } from "./context/ThemeContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : sampleTransactions;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                }
              />
              <Route
                path="/reports"
                element={<Reports transactions={transactions} />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}