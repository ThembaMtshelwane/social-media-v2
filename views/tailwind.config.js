/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F263E",
        secondary: "#2E7DCB",
        accent: "#E8E6E2",
      },
    },
  },
  plugins: [],
};
