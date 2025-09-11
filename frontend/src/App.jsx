// src/App.jsx

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Import Components & Pages
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTx, setEditingTx] = useState(null);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Fetch transactions from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching:", err);
        toast.error("Failed to fetch transactions.");
      });
  }, []);

  // Add transaction
  const addTransaction = async (newTx) => {
    try {
      const res = await axios.post("http://localhost:5000/api/transactions", newTx);
      setTransactions([...transactions, res.data]);
      toast.success("Transaction added successfully!");
    } catch (err) {
      console.error("❌ Error adding:", err);
      toast.error("Failed to add transaction.");
    }
  };

  // Update transaction
  const updateTransaction = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/transactions/${id}`, updatedData);
      setTransactions(transactions.map((t) => (t._id === id ? res.data : t)));
      toast.success("Transaction updated successfully!");
      setEditingTx(null);
    } catch (err) {
      console.error("❌ Error updating:", err);
      toast.error("Failed to update transaction.");
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting:", err);
      toast.error("Failed to delete transaction.");
    }
  };

  // Set transaction to be edited
  const handleEdit = (tx) => {
    setEditingTx(tx);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme} flex h-screen bg-gray-100 dark:bg-gray-900`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="p-6 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    addTransaction={addTransaction}
                    deleteTransaction={deleteTransaction}
                    handleEdit={handleEdit}
                    editingTx={editingTx}
                    updateTransaction={updateTransaction}
                    setEditingTx={setEditingTx}
                  />
                }
              />
              <Route path="/reports" element={<Reports transactions={transactions} />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;