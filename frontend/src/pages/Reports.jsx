// src/pages/Reports.jsx
import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

// Helper: format date as YYYY-MM
function formatMonth(dateStr) {
  return dateStr.slice(0, 7);
}

export default function Reports({ transactions }) {
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTx = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && date < start) return false;
      if (end && date > end) return false;
      return true;
    });
  }, [transactions, startDate, endDate]);

  const monthlyData = useMemo(() => {
    const map = new Map();
    filteredTx.forEach((t) => {
      const key = formatMonth(t.date);
      if (!map.has(key)) {
        map.set(key, { month: key, income: 0, expense: 0 });
      }
      const row = map.get(key);
      if (t.type === "income") row.income += t.amount;
      else row.expense += t.amount;
    });
    return Array.from(map.values()).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [filteredTx]);

  const trendData = useMemo(() => {
    let runningBalance = 0;
    return filteredTx
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((t) => {
        runningBalance += t.type === "income" ? t.amount : -t.amount;
        return { date: t.date, balance: runningBalance };
      });
  }, [filteredTx]);

  const exportCSV = () => {
    const headers = "Date,Category,Amount,Type,Note";
    const rows = filteredTx.map(
      (t) => `${t.date},"${t.category}","${t.amount}","${t.type}","${t.note || ""}"`
    );
    const csv = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tickColor = theme === "dark" ? "#A1A1AA" : "#374151";
  const inputClasses =
    "p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Financial Reports
      </h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={inputClasses}
        />
        <span className="text-gray-500 dark:text-gray-400">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={inputClasses}
        />
        <button
          onClick={exportCSV}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
            Monthly Income vs Expense
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#E5E7EB'} />
              <XAxis dataKey="month" tick={{ fill: tickColor }} />
              <YAxis tick={{ fill: tickColor }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#333" : "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: tickColor }} />
              <Bar dataKey="income" name="Income" fill="#22c55e" />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
            Balance Trend
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#E5E7EB'} />
              <XAxis dataKey="date" tick={{ fill: tickColor }} />
              <YAxis tick={{ fill: tickColor }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#333" : "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: tickColor }} />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke="#3b82f6"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}