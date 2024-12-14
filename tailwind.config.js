/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center: true
    },
    extend: {
      // screens:{
      //   'sm': '340px',
      // },
      colors:{
        primary: "#0aad0a",
        10: "#099c09",
        30: "#077907",
        50: "#055705",
        70: "#033403",
        90: "#011101",
      },
      fontFamily:{
        cairo: "Cairo Variable"
      }
    },
  },
  plugins: [],
}