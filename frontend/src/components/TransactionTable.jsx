import { useState } from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import Modal from "./Modal";
import Notification from "./Notification";

export default function TransactionTable({
  transactions,
  setTransactions,
  showTitle = false,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [txToDelete, setTxToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleEdit = (tx) => {
    setSelectedTx(tx);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTx = {
      ...selectedTx,
      category: e.target.category.value,
      amount: Number(e.target.amount.value),
    };
    const newTransactions = transactions.map((tx) =>
      tx.id === updatedTx.id ? updatedTx : tx
    );
    setTransactions(newTransactions);
    setIsEditModalOpen(false);
    setNotification({ message: "Transaction updated!", type: "success" });
    setTimeout(() => setNotification(null), 3000);
  };

  // Step 1: When trash icon is clicked, open modal and set which transaction to delete
  const promptDelete = (id) => {
    setTxToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Step 2: If user confirms, perform the deletion
  const confirmDelete = () => {
    if (txToDelete) {
      const newTransactions = transactions.filter((tx) => tx.id !== txToDelete);
      setTransactions(newTransactions);
      setNotification({ message: "Transaction deleted!", type: "error" });
      setTimeout(() => setNotification(null), 3000);
    }
    setIsDeleteModalOpen(false);
    setTxToDelete(null);
  };

  const getTypeClasses = (type) => {
    return type === "income"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {showTitle && (
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Recent Transactions
        </h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {tx.category}
                </td>
                <td className="px-6 py-4">₹{tx.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeClasses(tx.type)}`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => promptDelete(tx.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Transaction</h2>
        {selectedTx && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="category"
              defaultValue={selectedTx.category}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="number"
              name="amount"
              defaultValue={selectedTx.amount}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg w-full hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
            <FaExclamationTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Are you sure?
            </h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
                Do you really want to delete this transaction? This process cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-6 py-2.5 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                    Cancel
                </button>
                <button
                    onClick={confirmDelete}
                    className="px-6 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
      </Modal>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
