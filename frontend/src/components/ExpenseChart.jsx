// src/components/ExpenseChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../context/ThemeContext"; // Custom hook to get theme

function ExpenseChart({ transactions }) {
  const { theme } = useTheme(); // "light" or "dark"

  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
    .map((t) => ({
      date: t.date,
      amount: t.amount,
    }));

  const tickColor = theme === "dark" ? "#A1A1AA" : "#374151"; // Zinc-400 vs Gray-700

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Expense Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={expenseData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#E5E7EB'} />
          <XAxis dataKey="date" tick={{ fill: tickColor }} />
          <YAxis tick={{ fill: tickColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              borderColor: theme === "dark" ? "#555" : "#ccc",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#ef4444" // Red-500
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;