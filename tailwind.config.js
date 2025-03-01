/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      inset: {
        0: "0",
      },
    },
  },
  plugins: [],
};
