// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // This is the line you need to add
  theme: {
    extend: {},
  },
  plugins: [],
};