// src/components/Modal.jsx
import { useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl w-full max-w-md relative transform scale-95 hover:scale-100 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;