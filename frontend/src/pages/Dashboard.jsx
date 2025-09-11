// src/pages/Dashboard.jsx
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import StatCard from "../components/StatCard";
import ExpenseChart from "../components/ExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";
import TransactionTable from "../components/TransactionTable";
import AddTransactionForm from "../components/AddTransactionForm";

export default function Dashboard({
  transactions,
  addTransaction,
  deleteTransaction,
  handleEdit,
  editingTx,
  updateTransaction,
  setEditingTx,
}) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-700">
        Dashboard Overview
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString()}`}
          icon={<FaArrowUp />}
          color="text-green-500"
          bgColor="bg-green-50"
          darkBgColor="dark:bg-green-900"
        />
        <StatCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={<FaArrowDown />}
          color="text-red-500"
          bgColor="bg-red-50"
          darkBgColor="dark:bg-red-900"
        />
        <StatCard
          title="Balance"
          value={`₹${balance.toLocaleString()}`}
          icon={<FaWallet />}
          color="text-indigo-500"
          bgColor="bg-indigo-50"
          darkBgColor="dark:bg-indigo-900"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ExpenseChart transactions={transactions} />
        </div>
        <div className="lg:col-span-2">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Add Transaction & Recent Transactions */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <TransactionTable
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            handleEdit={handleEdit}
            showTitle={true}
          />
        </div>

        <div id="add-transaction">
          <AddTransactionForm
            addTransaction={addTransaction}
            editingTx={editingTx}
            updateTransaction={updateTransaction}
            setEditingTx={setEditingTx}
          />
        </div>
      </div>
    </div>
  );
}