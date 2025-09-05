import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ExpenseChart from "./components/ExpenseChart";
import CategoryPieChart from "./components/CategoryPieChart";
import TransactionTable from "./components/TransactionTable";
import AddTransactionForm from "./components/AddTransactionForm";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch transactions from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("❌ Error fetching:", err));
  }, []);

  // ✅ Add transaction
  const addTransaction = async (newTx) => {
    try {
      const res = await axios.post("http://localhost:5000/api/transactions", newTx);
      setTransactions([...transactions, res.data]);
    } catch (err) {
      console.error("❌ Error adding:", err);
    }
  };

  // ✅ Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Error deleting:", err);
    }
  };

  // ✅ Totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  if (loading) {
    return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Income"
              value={`₹${totalIncome}`}
              icon={<FaArrowUp />}
              color="text-green-500"
            />
            <StatCard
              title="Total Expenses"
              value={`₹${totalExpenses}`}
              icon={<FaArrowDown />}
              color="text-red-500"
            />
            <StatCard
              title="Balance"
              value={`₹${balance}`}
              icon={<FaWallet />}
              color="text-blue-500"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ExpenseChart transactions={transactions} />
            <CategoryPieChart transactions={transactions} />
          </div>

          {/* Transaction Table */}
          <TransactionTable
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />

          {/* Add Transaction Form */}
          <AddTransactionForm addTransaction={addTransaction} />
        </div>
      </div>
    </div>
  );
}

export default App;
