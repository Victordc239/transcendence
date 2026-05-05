/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pinkPrimary: "#F9A8D4",
        purplePrimary: "#C4B5FD",
        bluePrimary: "#93C5FD",
        greenPrimary: "#86EFAC",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.15)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};