import { useState } from "react";

export default function AddTransactionForm({ addTransaction }) {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...form, amount: Number(form.amount) });
    setForm({ type: "expense", category: "", amount: "", date: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-4">➕ Add Transaction</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note"
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Transaction
      </button>
    </form>
  );
}
