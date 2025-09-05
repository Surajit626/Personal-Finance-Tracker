// src/components/AddTransactionForm.jsx
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddTransactionForm({ setTransactions, transactions }) {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) {
      toast.error("Please fill in all required fields.", {
        style: {
          background: "#ef4444",
          color: "white",
        },
      });
      return;
    }

    const newTx = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTx, ...transactions]);

    toast.success("Transaction added successfully!", {
      style: {
        background: "#22c55e",
        color: "white",
      },
    });

    setForm({ type: "expense", category: "", amount: "", note: "" });
  };

  const inputClasses =
    "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full">
      <Toaster position="top-right" />
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Add New Transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className={inputClasses}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g., Food, Salary"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Note (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Dinner with friends"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className={inputClasses}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}