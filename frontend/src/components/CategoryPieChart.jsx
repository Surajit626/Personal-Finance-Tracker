// src/components/CategoryPieChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../context/ThemeContext";

const COLORS = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#22c55e", // green-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
];

function CategoryPieChart({ transactions }) {
  const { theme } = useTheme();
  const tickColor = theme === "dark" ? "#A1A1AA" : "#374151";

  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Expenses by Category
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          No expense data to display.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Expenses by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
              borderColor: theme === "dark" ? "#555" : "#ccc",
            }}
          />
          <Legend wrapperStyle={{ color: tickColor }} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryPieChart;