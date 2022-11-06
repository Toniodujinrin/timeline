/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        timeline: "#FF9900",
        white: "#ffff",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
