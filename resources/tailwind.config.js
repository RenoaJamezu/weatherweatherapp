/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#748CF1",
        secondaryColor: "#D9D9D9",
        tertiaryColor: "#EFEFEF",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}

