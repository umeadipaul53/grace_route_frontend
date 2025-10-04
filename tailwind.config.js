/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fffbea",
          100: "#fff3c4",
          200: "#fce588",
          300: "#fadb5f",
          400: "#f7c948",
          500: "#f0b429", // main gold
          600: "#de911d",
          700: "#cb6e17",
          800: "#b44d12",
          900: "#8d2b0b",
        },
      },
    },
  },
  plugins: [],
};
