// src/components/Notification.jsx
import { useEffect } from "react";

export default function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses =
    "fixed top-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn flex items-center gap-2";

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}