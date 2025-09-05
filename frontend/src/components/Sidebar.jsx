// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaChartPie, FaPlusCircle } from "react-icons/fa";

const linkClasses =
  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-400 hover:text-white transition-colors";
const activeLinkClasses = "bg-gray-700 text-white";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 dark:bg-gray-800 text-white p-6 flex flex-col gap-8 shadow-xl">
      <div className="flex items-center gap-3 text-2xl font-bold text-white">
        <span role="img" aria-label="money-bag" className="text-3xl">
          💰
        </span>
        <span>Finance Tracker</span>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeLinkClasses : ""}`
          }
        >
          <FaChartPie />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/#add-transaction"
          className={linkClasses}
          onClick={() => {
            setTimeout(() => {
              const el = document.getElementById("add-transaction");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 0);
          }}
        >
          <FaPlusCircle />
          <span>Add Transaction</span>
        </NavLink>
      </nav>
    </aside>
  );
}