// src/components/TrendChart.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMemo } from "react";

export default function TrendChart({ transactions }) {
  // aggregate by month (YYYY-MM)
  const data = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      const m = t.date.slice(0,7);
      if (!map[m]) map[m] = { month: m, income: 0, expense: 0 };
      if (t.type === "income") map[m].income += t.amount;
      else map[m].expense += t.amount;
    });
    return Object.values(map).sort((a,b) => a.month.localeCompare(b.month)).map(d => ({ ...d, net: d.income - d.expense }));
  }, [transactions]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm w-full">
      <h4 className="font-semibold mb-2">Monthly Trend</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" name="Expense" />
          <Line type="monotone" dataKey="net" stroke="#4f46e5" name="Net" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
