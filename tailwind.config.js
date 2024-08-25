/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // This already includes all files in src
    "./src/screens/HomeScreen.{js,jsx,ts,tsx}", // Explicitly include files in screens folder
  ],

  theme: {
    extend: {},
    colors: {
      "light-green": "#C3E600",
      "light-gray": "#F0F0F0",
      "light-green-with-blue": "#96CCC3",
    },
  },
  plugins: [],
};
