// src/components/TransactionTable.jsx

import { useState } from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import Modal from "./Modal";

export default function TransactionTable({
  transactions,
  deleteTransaction,
  handleEdit, // This function correctly populates the main form for editing
  showTitle = false,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [txToDelete, setTxToDelete] = useState(null);

  const promptDelete = (tx) => {
    setTxToDelete(tx);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (txToDelete) {
      deleteTransaction(txToDelete._id);
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
                key={tx._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString()}</td>
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
                  {/* This button now correctly calls the handleEdit prop */}
                  <button
                    onClick={() => handleEdit(tx)}
                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => promptDelete(tx)}
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

      {/* The Edit Modal has been removed. Only the Delete Modal remains. */}
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
    </div>
  );
}