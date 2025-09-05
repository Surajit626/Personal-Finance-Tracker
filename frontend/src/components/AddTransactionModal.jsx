// src/components/AddTransactionModal.jsx
import { useState } from "react";

export default function AddTransactionModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    type: "expense", category: "", amount: "", date: "", note: ""
  });

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      type: form.type,
      category: form.category || (form.type === "expense" ? "Other" : "Income"),
      amount: Number(form.amount),
      date: form.date || new Date().toISOString().slice(0, 10),
      note: form.note
    });
    onClose();
    setForm({ type: "expense", category: "", amount: "", date: "", note: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>

        <label className="block text-sm">Type</label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 mb-3 rounded border">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <label className="block text-sm">Category</label>
        <input name="category" value={form.category} onChange={handleChange} className="w-full p-2 mb-3 rounded border" />

        <label className="block text-sm">Amount</label>
        <input name="amount" value={form.amount} onChange={handleChange} type="number" className="w-full p-2 mb-3 rounded border" />

        <label className="block text-sm">Date</label>
        <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full p-2 mb-3 rounded border" />

        <label className="block text-sm">Note</label>
        <input name="note" value={form.note} onChange={handleChange} className="w-full p-2 mb-4 rounded border" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-1 rounded bg-indigo-600 text-white">Add</button>
        </div>
      </form>
    </div>
  );
}
