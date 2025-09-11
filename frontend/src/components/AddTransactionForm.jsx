// src/components/AddTransactionForm.jsx
import { useState, useEffect } from "react";

export default function AddTransactionForm({
  addTransaction,
  editingTx,
  updateTransaction,
  setEditingTx,
}) {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  const isEditing = editingTx !== null;

  useEffect(() => {
    if (isEditing) {
      setForm({
        type: editingTx.type,
        category: editingTx.category,
        amount: editingTx.amount,
        date: new Date(editingTx.date).toISOString().split("T")[0],
        note: editingTx.note || "",
      });
    }
  }, [editingTx, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ type: "expense", category: "", amount: "", date: "", note: "" });
    if (isEditing) {
      setEditingTx(null);
    }
  };

  // ✅ Fixed: Made the function async and added 'await'
  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = { ...form, amount: Number(form.amount) };

    if (isEditing) {
      // ✅ Ensures the update finishes before proceeding
      await updateTransaction(editingTx._id, transactionData);
    } else {
      await addTransaction(transactionData);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {isEditing ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
        <input type="text" name="note" value={form.note} onChange={handleChange} placeholder="Note" className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 col-span-1 md:col-span-2" />
      </div>
      <div className="flex items-center mt-4">
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          {isEditing ? "Update Transaction" : "Save Transaction"}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}