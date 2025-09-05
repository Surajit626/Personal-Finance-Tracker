// src/components/StatCard.jsx
function StatCard({ title, value, icon, color, bgColor, darkBgColor }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        className={`p-4 rounded-full ${bgColor} ${darkBgColor} ${color}`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;