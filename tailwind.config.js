/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryHover: "#2D3773",
        textPrimaryHover: "#A0DBF2",
      },
      screens: {
        lg: "1045px",
      },
    },
  },
  plugins: [],
};
